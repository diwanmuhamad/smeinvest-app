import { sequelize } from "../../../src/commons/db";
import { DataTypes } from "sequelize";

const InvestmentRelation = sequelize.define("InvestmentRelations", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
  },
  investment_id: {
    type: DataTypes.INTEGER,
  },
  amount: {
    type: DataTypes.FLOAT,
  },
  status: {
    type: DataTypes.STRING,
  },
  created_at: {
    type: DataTypes.DATE,
  },
}, {timestamps: false});

export { InvestmentRelation };
