import { Router } from "express";

const userRouter = Router();
import {
    getUserDetail,
    checkUser
} from '../../controllers/users'

userRouter.get("/:id", getUserDetail);
userRouter.get("/check/:wallet", checkUser);
userRouter.get("/profit/:id", async () => {});

export { userRouter };
