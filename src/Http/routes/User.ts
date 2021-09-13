import { Router } from 'express';

import UserController from '../controllers/User';
import validateUser from '../middlewares/validateUser';

const userRouter = Router();

userRouter.post('/create', UserController.create);
userRouter.post('/auth', validateUser, UserController.auth);
userRouter.get('/:id', UserController.getUser);
userRouter.get('/google/auth', UserController.googleAuth);
userRouter.post('/google/auth', UserController.googleUserDetails);



// userRouter.post('/update/:id', UserController.updateById);
// userRouter.delete('/remove/:id', UserController.remove);

export default userRouter;
