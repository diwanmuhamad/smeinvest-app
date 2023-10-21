import { Router } from "express";

const smesRouter = Router();
import {
    getSMElist,
    getSMEDetail,
    getSMEInvestmentDetail
} from '../../controllers/smes'

smesRouter.get("/", getSMElist);
smesRouter.get("/:id", getSMEDetail);
smesRouter.get("/investment/:id", getSMEInvestmentDetail);
smesRouter.post("/invest", async () => {});

export { smesRouter };
