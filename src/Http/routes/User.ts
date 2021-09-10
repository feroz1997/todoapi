import { Router } from 'express';

import UserController from '../controllers/User';

const userRouter = Router();

userRouter.post('/create', UserController.create);
userRouter.post('/auth', UserController.auth);
userRouter.get('/:id', UserController.getUser);



// userRouter.post('/update/:id', UserController.updateById);
// userRouter.delete('/remove/:id', UserController.remove);

export default userRouter;
