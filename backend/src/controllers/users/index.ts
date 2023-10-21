import { sendErrorMsg, sendSuccessMsg } from "../../commons/response";
import { SME, Investment, User, InvestmentRelation } from "../../../models/database";

function generateRandomUsername(length: number) {
  const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let username = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    username += characters.charAt(randomIndex);
  }

  return username;
}

const checkUser = async (req: any, res: any) => {
  const wallet = req?.params?.wallet;
  if (!wallet) {
    return sendErrorMsg(res, {
      msg: "reqBody is not valid",
      error: "something wrong",
    });
  }

  const defaults: any = {
    wallet: wallet,
    username: generateRandomUsername(8),
    role: 'general',
    created_at: new Date(),
    updated_at: new Date()
  }

  try {
    const [user, created] = await User.findOrCreate({
      where: {
        wallet: wallet
      },
      attributes: [
        'id',
        'wallet',
        'username',
        'role',
        'created_at',
        'updated_at'
      ],
      defaults
    })

    if (created) {
      console.log('User was created:', user.get());
    } else {
      console.log('User already existed:', user.get());
    }

    return sendSuccessMsg(res, {
      msg: "User checked successfully",
      data: user.get(),
    });
  } catch (error) {
    console.error("Error when checking user data:", error);
    return sendErrorMsg(res, {
      msg: "User not checked successfully",
      error: "something wrong",
    });
  }
}

const getUserDetail = async (req: any, res: any) => {
  const userId = req.params.id;
  if (!userId) {
    return sendErrorMsg(res, {
      msg: "User detail not fetched successfully",
      error: "something wrong",
    });
  }
  try {
    const user = await User.findOne({
      attributes: ["username", "wallet", "role", "created_at", "updated_at"],
      where: { id: userId },
      include: [
        {
          model: InvestmentRelation,
          attributes: ['amount', 'status'],
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
              required: false,
              include: [
                {
                  model: SME,
                  attributes: ["username", "wallet", "industry_type"],
                },
              ],
            },
          ]
        }
      ],
    });
    return sendSuccessMsg(res, {
      msg: "User detail fetched successfully",
      data: user,
    });
  } catch (error) {
    console.error("Error retrieving SME data:", error);
    return sendErrorMsg(res, {
      msg: "User detail not fetched successfully",
      error: "something wrong",
    });
  }
};

export { getUserDetail, checkUser };
