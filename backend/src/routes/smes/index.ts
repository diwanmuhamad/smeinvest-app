import { Router } from "express";

const smesRouter = Router();
import {
    getSMElist,
    getSMEDetail,
    getSMEInvestmentDetail,
    investSMEs
} from '../../controllers/smes'
import {authCheck} from "../../middleware/authCheck";

smesRouter.get("/", getSMElist);
smesRouter.get("/:id", getSMEDetail);
smesRouter.get("/investment/:id", getSMEInvestmentDetail);
smesRouter.post("/invest", authCheck, investSMEs);

export { smesRouter };
