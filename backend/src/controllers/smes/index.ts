import { sendErrorMsg, sendSuccessMsg } from "../../commons/response";
import {
  SME,
  Investment,
  User,
  InvestmentRelation,
} from "../../../models/database";
import axios from "axios";
const { S3, GetObjectCommand } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");

const s3 = new S3({ apiVersion: '2006-03-01', credentials: {
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
}, region: 'ap-southeast-1' });

const getSMElist = async (req: any, res: any) => {
  try {
    // Use Sequelize to retrieve SME data with details
    const investments = await Investment.findAll({
      attributes: [
        "investment_target",
        "current_investment",
        "return_expectation",
        "investment_status",
      ],
      where: {
        investment_status: "active", // Assuming you want only active investments
      },
      include: [
        {
          model: SME,
          attributes: ["id", "username", "wallet", "photo"],
          required: false, // Left join to get all SMEs, even those with no investments
        },
      ],
    });

    // Calculate the percentage
    let smeList: any[] = [];
    for (let key in investments) {
      const investmentData: any = investments[key]
      const currentInvestment = investmentData?.current_investment ?? 0;
      const targetInvestment = investmentData?.investment_target ?? 1; // Avoid division by zero
      const percentage = (currentInvestment / targetInvestment) * 100;

      const params = {
        Bucket: process.env.BUCKET_URL,
        Key: investmentData?.SME?.photo,
      };
      const command = new GetObjectCommand(params)
      const signedUrl = await getSignedUrl(s3, command, { expiresIn: 3600 });
      smeList.push({
        smes_id: investmentData?.SME?.id,
        smes_name: investmentData?.SME?.username,
        wallet: investmentData?.SME?.wallet,
        current_investment: currentInvestment,
        target_investment: targetInvestment,
        photo: signedUrl,
        percentage,
      });
    };
    return sendSuccessMsg(res, {
      msg: "SMEs list fetched successfully",
      data: smeList,
    });
  } catch (error) {
    console.error("Error retrieving SME data:", error);
    return sendErrorMsg(res, {
      msg: "SMEs list not fetched successfully",
      error: "something wrong",
    });
  }
};

const getSMEDetail = async (req: any, res: any) => {
  const smeId = req.params.id;
  if (!smeId) {
    return sendErrorMsg(res, {
      msg: "SMEs detail not fetched successfully",
      error: "something wrong",
    });
  }
  try {
    const sme: any = await SME.findOne({
      attributes: [
        "username",
        "wallet",
        "photo",
        "industry_type",
        "created_at",
        "updated_at",
      ],
      where: { id: smeId },
    });
    const params = {
      Bucket: process.env.BUCKET_URL,
      Key: sme.photo,
    };
    const command = new GetObjectCommand(params)
    const signedUrl = await getSignedUrl(s3, command, { expiresIn: 3600 });
    sme['photo'] = signedUrl
    return sendSuccessMsg(res, {
      msg: "SMEs detail fetched successfully",
      data: sme,
    });
  } catch (error) {
    console.error("Error retrieving SME data:", error);
    return sendErrorMsg(res, {
      msg: "SMEs detail not fetched successfully",
      error: "something wrong",
    });
  }
};

const getSMEInvestmentDetail = async (req: any, res: any) => {
  const smeId = req.params.id;
  if (!smeId) {
    return sendErrorMsg(res, {
      msg: "SMEs investment not fetched successfully",
      error: "something wrong",
    });
  }
  try {
    const sme: any = await SME.findOne({
      attributes: [
        "username",
        "wallet",
        "photo",
        "industry_type",
        "created_at",
        "updated_at",
      ],
      where: { id: smeId }, // Specify the condition to find the SME by its ID
      include: [
        {
          model: Investment,
          attributes: [
            "current_investment",
            "investment_target",
            "investment_status",
            "start_at",
            "end_at",
          ],
          required: false, // Left join to get all SMEs, even those with no investments
          include: [
            {
              model: InvestmentRelation,
              attributes: ["status", "amount"],
              required: false, // Left join to get all investments, even those with no relations
              include: [
                {
                  model: User,
                  attributes: ["username", "wallet"],
                },
              ],
            },
          ],
        },
      ],
    });

    if (!sme) {
      return sendSuccessMsg(res, {
        msg: "SMEs investment fetched successfully",
        data: null,
      });
    }

    // Process the SME and return the response
    const investments = sme.Investments || [];

    const totalInvestors = investments.reduce((count: any, investment: any) => {
      const investmentRelations = investment.InvestmentRelations || [];
      return (
        count +
        investmentRelations.reduce((relationCount: any, relation: any) => {
          return relation.User ? relationCount + 1 : relationCount;
        }, 0)
      );
    }, 0);

    const smeData = {
      id: sme.id,
      username: sme.username,
      wallet: sme.wallet,
      investments: investments.map((investment: any) => ({
        id: investment.id,
        current_investment: investment.current_investment,
        investment_target: investment.investment_target,
        start_at: investment.start_at,
        end_at: investment.end_at,
        investmentRelations: investment.InvestmentRelations || [],
      })),
      total_investors: totalInvestors,
    };

    return sendSuccessMsg(res, {
      msg: "SMEs investment fetched successfully",
      data: smeData,
    });
  } catch (error) {
    console.error("Error retrieving SME data:", error);
    return sendErrorMsg(res, {
      msg: "SMEs investment not fetched successfully",
      error: "something wrong",
    });
  }
};

const investSMEs = async (req: any, res: any) => {
  const reqBody = JSON.parse(JSON.stringify(req.body));
  if (
    !reqBody?.to ||
    typeof reqBody?.to === "undefined" ||
    !reqBody?.amount ||
    typeof reqBody?.amount === "undefined"
  ) {
    return sendErrorMsg(res, {
      msg: "SMEs not invested successfully",
      error: "something wrong",
    });
  }

  // get user
  const user: any = await User.findOne({
    where: {
      wallet: req?.user?.lightning_address,
    },
  });

  if (!user) {
    console.error("investSMEs::user");
    return sendErrorMsg(res, {
      msg: "SMEs not invested successfully",
      error: "something wrong",
    });
  }

  // check "to" wallet if it belongs to SMEs
  const sme: any = await SME.findOne({
    where: {
      wallet: reqBody?.to,
    },
  });

  if (!sme) {
    console.error("investSMEs::smeDetail");
    return sendErrorMsg(res, {
      msg: "SMEs not invested successfully",
      error: "something wrong",
    });
  }

  // check investment exist or not
  const investment: any = await Investment.findOne({
    where: {
      smes_id: sme.get()?.id,
    },
  });

  if (!investment) {
    console.error("investSMEs::investment");
    return sendErrorMsg(res, {
      msg: "SMEs not invested successfully",
      error: "something wrong",
    });
  }

  // processing investment
  let invoice:any = null;
  await axios
    .post(
      `${process.env.ALBY_API_URL}/invoices`,
      {
        amount: reqBody?.amount,
      },
      {
        headers: {
          Authorization: `Bearer ${reqBody?.to}`,
        },
      }
    )
    .then((response: any) => {
      console.log("Response:", response?.data);
      invoice = response.data;
    })
    .catch((error) => {
      console.error("investSMEs::invoices:", error);
      return sendErrorMsg(res, {
        msg: "SMEs not invested successfully",
        error: "something wrong",
      });
    });

  // create payments
  let paymentResult = null
  await axios
    .post(
      `${process.env.ALBY_API_URL}/payments/bolt11`,
      {
        invoice: invoice?.payment_request,
      },
      {
        headers: {
          Authorization: `Bearer ${req?.token}`,
        },
      }
    )
    .then((response: any) => {
      console.log("Response:", response?.data);
      paymentResult = response.data;
    })
    .catch((error) => {
      console.error("investSMEs::payments:", error);
      return sendErrorMsg(res, {
        msg: "SMEs not invested successfully",
        error: "something wrong",
      });
    });

  if (!paymentResult) {
    console.error("investSMEs::null");
    return sendErrorMsg(res, {
      msg: "SMEs not invested successfully",
      error: "something wrong",
    });
  }

  const params = {
    current_investment: (investment.current_investment ?? 0) + reqBody?.amount
  }

  // update investment
  try {
    await Investment.update(params, {
      where: {id: investment.id}
    })
    // create investment relation
    const creationParamsInvestment = {
      user_id: user.get()?.id,
      smes_id: sme?.id,
      investment_id: investment.id,
      amount: reqBody?.amount,
      status: 'completed',
      created_at: new Date()
    }

    const invtRelation: any = await InvestmentRelation.create(creationParamsInvestment)
    console.log('invtRelation created: ', invtRelation?.id)
  } catch (error) {
    console.error("investSMEs::update");
    return sendErrorMsg(res, {
      msg: "SMEs not invested successfully",
      error: "something wrong",
    });
  }

  console.log(`Updated investment with ID ${investment?.id}`);
  return sendSuccessMsg(res, {
    msg: "SMEs invested successfully",
    data: {},
  });
};

export { getSMElist, getSMEDetail, getSMEInvestmentDetail, investSMEs };
