import { Router } from "express";

const smesRouter = Router();

smesRouter.get("/", async () => {});
smesRouter.get("/:id", async () => {});
smesRouter.get("/invesment/:id", async () => {});
smesRouter.post("/invest", async () => {});

export { smesRouter };
