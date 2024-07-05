import { Response } from 'express';

import { forEach } from 'lodash';

import logger from '../logger/util';

import { SendResponseResult } from './type';

export function sendSuccessResponse(
  res: Response,
  statusCode: number,
  data: any,
): SendResponseResult {
  return res.status(statusCode).json({
    statusCode,
    success: true,
    data,
  });
}

export function sendErrorResponse(
  res: Response,
  statusCode: number,
  errors: string[],
): SendResponseResult {
  forEach(errors, (error) => logger.error(error));

  return res.status(statusCode).json({
    statusCode,
    success: false,
    errors,
  });
}
