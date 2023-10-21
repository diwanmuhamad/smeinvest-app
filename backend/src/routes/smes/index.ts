import { Router } from "express";

const smesRouter = Router();
import {
    getSMElist
} from '../../controllers/smes'

smesRouter.get("/", getSMElist);
smesRouter.get("/:id", async () => {});
smesRouter.get("/invesment/:id", async () => {});
smesRouter.post("/invest", async () => {});

export { smesRouter };
