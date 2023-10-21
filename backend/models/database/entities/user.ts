import { sequelize } from "../../../src/commons/db";
import { DataTypes } from "sequelize";

const User = sequelize.define("Users", {
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
  role: {
    type: DataTypes.STRING,
  },
  created_at: {
    type: DataTypes.DATE,
  },
  updated_at: {
    type: DataTypes.DATE,
  },
});

export { User };
