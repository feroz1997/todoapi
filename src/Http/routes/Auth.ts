import { Router } from 'express';

import AuthController from '../controllers/Auth';
import validateUser from '../middlewares/validateUser';

const authRouter = Router();

authRouter.post('/signup', AuthController.signUp);
authRouter.post('/login', validateUser, AuthController.login);
authRouter.get('/google/login', AuthController.googleLogin);
authRouter.post('/google/details', AuthController.googleAccountDetails);

export default authRouter;
