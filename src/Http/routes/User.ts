import { Router } from 'express';

import UserController from '../controllers/User';

const userRouter = Router();

userRouter.get('/:userId', UserController.getUser);

export default userRouter;
