import { Router } from "express";

const userRouter = Router();

userRouter.get("/:id", async () => {});
userRouter.get("/profit/:id", async () => {});

export { userRouter };
