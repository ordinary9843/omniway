import { Request, Response, NextFunction } from 'express';

import { REFRESH_TOKEN_VALIDATION_RULES } from '../../utils/validator/constant';
import { validateRequest } from '../../utils/validator/util';

import { MiddlewareResult } from '../type';

const validateRefreshTokenMiddleware = [
  REFRESH_TOKEN_VALIDATION_RULES,
  (req: Request, res: Response, next: NextFunction): MiddlewareResult =>
    validateRequest(req, res, next),
];

export default validateRefreshTokenMiddleware;
