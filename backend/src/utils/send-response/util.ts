import { Response } from 'express';

import logger from '../logger/util';

import { SendResponseResult } from './type';

export const sendSuccessResponse = (
  res: Response,
  statusCode: number,
  data?: any,
): SendResponseResult => {
  return res.status(statusCode).json({
    success: true,
    data,
  });
};

export const sendErrorResponse = (
  res: Response,
  statusCode: number,
  error: string,
): SendResponseResult => {
  logger.error(error);

  return res.status(statusCode).json({
    success: false,
    error,
  });
};
