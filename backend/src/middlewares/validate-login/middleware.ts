import { Request, Response, NextFunction } from 'express';

import {
  PASSWORD_VALIDATION_RULES,
  USERNAME_VALIDATION_RULES,
} from '../../modules/user/constant';
import { validateRequest } from '../../utils/validator/util';

import { MiddlewareResult } from '../type';

const validateLoginMiddleware = [
  USERNAME_VALIDATION_RULES,
  PASSWORD_VALIDATION_RULES,
  (req: Request, res: Response, next: NextFunction): MiddlewareResult =>
    validateRequest(req, res, next),
];

export default validateLoginMiddleware;
