import { NextFunction } from 'express';
import { Request, Response } from 'express';
import { Result, ValidationError, validationResult } from 'express-validator';
import { first, get } from 'lodash';

import { hashPassword } from '../crypto/util';
import { sendErrorResponse } from '../send-response/util';

import { ValidatePasswordResult, ValidateRequestResult } from './type';

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

export async function validatePassword(
  enteredPassword: string,
  originalPassword: string,
  salt: string,
): Promise<ValidatePasswordResult> {
  return (await hashPassword(enteredPassword, salt)) === originalPassword;
}
