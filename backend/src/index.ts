import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import { router } from "./routes";
import { sequelize } from "./commons/db";

dotenv.config();

const app: Express = express();
const port = process.env.PORT;
app.use(cors());

// body-parser
app.use(bodyParser.json({ limit: "5mb", type: "application/json" }));
app.use(bodyParser.urlencoded({ limit: "5mb", extended: true }));
app.use("/", router);

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to SME Investment app!");
});
app.use(express.json());

app.listen(port, async () => {
  await sequelize
    .authenticate()
    .then(() => {
      console.log("Connection has been established successfully.");
      console.log(`
    🚀 Server ready at: http://localhost:${port}`);
      })
    .catch((error) => {
      console.error("Unable to connect to the database:", error);
    });
});
