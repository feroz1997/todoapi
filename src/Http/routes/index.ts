import {Router} from "express";
import taskRouter from "./Task";
import userRouter from "./User";

const router = Router();
router.use("/task",taskRouter);
router.use("/user",userRouter);
export default router;

