import { NextFunction } from 'express';
import { Request, Response } from 'express';
import { Result, ValidationError, validationResult } from 'express-validator';
import { first, get } from 'lodash';

import { sendErrorResponse } from '../send-response/util';

import { ValidateRequestResult } from './type';

export function validateRequest(
  req: Request,
  res: Response,
  next: NextFunction,
): ValidateRequestResult {
  const errors: Result<ValidationError> = validationResult(req);
  if (!errors.isEmpty()) {
    return sendErrorResponse(res, 400, get(first(errors.array()), 'msg'));
  }
  next();
}
