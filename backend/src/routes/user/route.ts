import { Router } from 'express';

import validateAuthorizationMiddleware from '../../middlewares/validate-authorization/middleware';
import validateChangePasswordMiddleware from '../../middlewares/validate-change-password/middleware';
import validateLoginMiddleware from '../../middlewares/validate-login/middleware';
import validateRefreshTokenMiddleware from '../../middlewares/validate-refresh-token/middleware';
import validateRegisterMiddleware from '../../middlewares/validate-register/middleware';
import UserController from '../../modules/user/controller';

const userRoute = Router();
userRoute.post(
  '/register',
  validateRegisterMiddleware,
  UserController.register,
);
userRoute.post('/login', validateLoginMiddleware, UserController.login);
userRoute.post(
  '/change-password',
  validateAuthorizationMiddleware,
  validateChangePasswordMiddleware,
  UserController.changePassword,
);

userRoute.post(
  '/validate-refresh-token',
  validateRefreshTokenMiddleware,
  UserController.validateRefreshToken,
);

export default userRoute;
