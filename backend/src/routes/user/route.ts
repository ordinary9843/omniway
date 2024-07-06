import { Router } from 'express';

import validateLoginMiddleware from '../../middlewares/validate-login/middleware';
import validateRegisterMiddleware from '../../middlewares/validate-register/middleware';
import UserController from '../../modules/user/controller';

const userRoute = Router();
userRoute.post(
  '/register',
  validateRegisterMiddleware,
  UserController.register,
);
userRoute.post('/login', validateLoginMiddleware, UserController.login);

export default userRoute;
