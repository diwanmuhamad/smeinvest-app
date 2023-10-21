import { sendErrorMsg, sendSuccessMsg } from "../../commons/response";
import { SME, Investment } from '../../../models/database';
import { Sequelize, Op } from 'sequelize';

const getSMElist = async (req: any, res: any) => {
  try {
    // Use Sequelize to retrieve SME data with details
    const smes = await SME.findAll({
      attributes: ['username', 'wallet'],
      include: [
        {
          model: Investment,
          attributes: ['current_investment', 'investment_target'],
          where: {
            investment_status: 'active', // Assuming you want only active investments
          },
          required: false, // Left join to get all SMEs, even those with no investments
        },
      ]
    });

    // Calculate the percentage
    const smeList = smes.map((sme: any) => {
      const currentInvestment = sme.Investments?.[0]?.getDataValue('current_investment') || 0;
      const targetInvestment = sme.Investments?.[0]?.getDataValue('target_investment') || 1; // Avoid division by zero
      const percentage = (currentInvestment / targetInvestment) * 100;
      return {
        smes_name: sme.username,
        wallet: sme.wallet,
        current_investment: currentInvestment,
        target_investment: targetInvestment,
        percentage,
      };
    });
    return sendSuccessMsg(res, {
      msg: "SMEs list fetched successfully",
      data: smeList,
    });
  } catch (error) {
    console.error('Error retrieving SME data:', error);
    return sendErrorMsg(res, {
      msg: "SMEs list not fetched successfully",
      error: "something wrong",
    });
  }
}

export {
  getSMElist
}