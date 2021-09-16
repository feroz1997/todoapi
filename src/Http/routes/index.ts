import {Router} from "express";

import taskRouter from "./Task";
import userRouter from "./User";
import authRouter from "./Auth";

const router = Router();

router.use("/task",taskRouter);
router.use("/user",userRouter);
router.use("/",authRouter)

export default router;

