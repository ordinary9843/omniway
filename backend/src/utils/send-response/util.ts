import { Response } from 'express';

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
  error: string,
): SendResponseResult {
  logger.error(error);

  return res.status(statusCode).json({
    statusCode,
    success: false,
    error,
  });
}
