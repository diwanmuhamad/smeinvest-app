import { Sequelize } from "sequelize";
import * as dotenv from "dotenv";
dotenv.config();

const dbUser = process.env.DB_USER
const dbPass = process.env.DB_PASSWORD
const dbName = process.env.DB_NAME
const host = process.env.DB_HOST

const sequelize = new Sequelize({
  dialect: 'postgres',
  host: host,
  database: dbName,
  username: dbUser,
  password: dbPass
})

export { sequelize };