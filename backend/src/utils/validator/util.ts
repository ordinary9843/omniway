import { NextFunction } from 'express';
import { Request, Response } from 'express';
import { Result, ValidationError, validationResult } from 'express-validator';
import { first, get } from 'lodash';

import { hashPassword } from '../crypto/util';
import { sendErrorResponse } from '../send-response/util';

import { ValidatePasswordResult, ValidateRequestResult } from './type';

export const validateRequest = (
  req: Request,
  res: Response,
  next: NextFunction,
): ValidateRequestResult => {
  const errors: Result<ValidationError> = validationResult(req);
  if (!errors.isEmpty()) {
    return sendErrorResponse(res, 400, get(first(errors.array()), 'msg'));
  }
  next();
};

export const validatePassword = async (
  enteredPassword: string,
  originalPassword: string,
  salt: string,
): Promise<ValidatePasswordResult> => {
  return hashPassword(enteredPassword, salt) === originalPassword;
};
