import { Request, Response, NextFunction } from 'express';

import logger from '../../utils/logger/util';
import { MiddlewareResult } from '../type';

const loggerMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
): MiddlewareResult => {
  logger.info(
    `[${new Date().toISOString()}] ${req.method} ${req.originalUrl}, IP: ${req.ip}, Body: ${JSON.stringify(req.body)}`,
  );
  next();
};

export default loggerMiddleware;
