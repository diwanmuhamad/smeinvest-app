import { Router } from "express";

const smesRouter = Router();
import {
    getSMElist,
    getSMEDetail,
    getSMEInvestment
} from '../../controllers/smes'

smesRouter.get("/", getSMElist);
smesRouter.get("/:id", getSMEDetail);
smesRouter.get("/investment/:id", getSMEInvestment);
smesRouter.post("/invest", async () => {});

export { smesRouter };
