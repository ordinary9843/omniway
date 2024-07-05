import { Router } from 'express';

import validateRegisterMiddleware from '../../middlewares/validate-register/middleware';
import UserController from '../../modules/user/controller';

const userRoute = Router();

userRoute.post(
  '/register',
  validateRegisterMiddleware,
  UserController.register,
);

export default userRoute;
