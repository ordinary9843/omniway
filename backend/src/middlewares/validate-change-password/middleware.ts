import { Request, Response, NextFunction } from 'express';

import {
  CONFIRM_NEW_PASSWORD_VALIDATION_RULES,
  NEW_PASSWORD_VALIDATION_RULES,
  PASSWORD_VALIDATION_RULES,
} from '../../modules/user/constant';
import { validateRequest } from '../../utils/validator/util';

import { MiddlewareResult } from '../type';

const validateChangePasswordMiddleware = [
  PASSWORD_VALIDATION_RULES,
  NEW_PASSWORD_VALIDATION_RULES,
  CONFIRM_NEW_PASSWORD_VALIDATION_RULES,
  (req: Request, res: Response, next: NextFunction): MiddlewareResult =>
    validateRequest(req, res, next),
];

export default validateChangePasswordMiddleware;
