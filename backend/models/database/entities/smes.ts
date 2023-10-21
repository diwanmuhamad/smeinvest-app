import { sequelize } from "../../../src/commons/db";
import { DataTypes } from "sequelize";

const SME = sequelize.define("SMEs", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  username: {
    type: DataTypes.STRING,
  },
  wallet: {
    type: DataTypes.STRING,
  },
  photo: {
    type: DataTypes.STRING,
  },
  industry_type: {
    type: DataTypes.STRING,
  },
  created_at: {
    type: DataTypes.DATE,
  },
  updated_at: {
    type: DataTypes.DATE,
  },
});

export { SME };
