import { sendErrorMsg, sendSuccessMsg } from "../../commons/response";
import { SME, Investment, User, InvestmentRelation } from "../../../models/database";

const getSMElist = async (req: any, res: any) => {
  try {
    // Use Sequelize to retrieve SME data with details
    const investments = await Investment.findAll({
      attributes: [
        "investment_target", 
        "current_investment", 
        "return_expectation",
        "investment_status"
      ],
      where: {
        investment_status: "active", // Assuming you want only active investments
      },
      include: [
        {
          model: SME,
          attributes: ["username", "wallet"],
          required: false, // Left join to get all SMEs, even those with no investments
        },
      ],
    });

    // Calculate the percentage
    let smeList: any[] = []
    investments.forEach((investment: any) => {
      const currentInvestment =
      investment?.current_investment ?? 0;
      const targetInvestment =
      investment?.target_investment ?? 1; // Avoid division by zero
      const percentage = (currentInvestment / targetInvestment) * 100;
      smeList.push({
        smes_name: investment?.SME?.username,
        wallet: investment?.SME?.wallet,
        current_investment: currentInvestment,
        target_investment: targetInvestment,
        percentage,
      });
    });
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
    const sme = await SME.findOne({
      attributes: ['username', 'wallet', 'photo', 'industry_type', 'created_at', 'updated_at'],
      where: { id: smeId },
    })
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
}

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
      attributes: ['username', 'wallet', 'photo', 'industry_type', 'created_at', 'updated_at'],
      where: { id: smeId }, // Specify the condition to find the SME by its ID
      include: [
        {
          model: Investment,
          attributes: [
            'current_investment', 
            'investment_target', 
            'investment_status',
            'start_at',
            'end_at'
          ],
          required: false, // Left join to get all SMEs, even those with no investments
          include: [
            {
              model: InvestmentRelation,
              attributes: ['status', 'amount'],
              required: false, // Left join to get all investments, even those with no relations
              include: [
                {
                  model: User,
                  attributes: ['username', 'wallet'],
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
}

export { getSMElist, getSMEDetail, getSMEInvestmentDetail };
