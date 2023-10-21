import { sequelize } from "../../../src/commons/db";
import { DataTypes } from "sequelize";

const Investment = sequelize.define("Investments", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING,
  },
  description: {
    type: DataTypes.TEXT,
  },
  investment_target: {
    type: DataTypes.FLOAT,
  },
  current_investment: {
    type: DataTypes.FLOAT,
  },
  return_expectation: {
    type: DataTypes.INTEGER,
  },
  start_at: {
    type: DataTypes.DATE,
  },
  end_at: {
    type: DataTypes.DATE,
  },
  smes_id: {
    type: DataTypes.INTEGER,
  },
  investment_status: {
    type: DataTypes.STRING,
  },
  created_at: {
    type: DataTypes.DATE,
  },
  updated_at: {
    type: DataTypes.DATE,
  },
}, {timestamps: false});

export { Investment };
