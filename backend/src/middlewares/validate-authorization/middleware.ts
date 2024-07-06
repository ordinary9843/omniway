import { Request, Response, NextFunction } from 'express';

import { JsonWebTokenError } from 'jsonwebtoken';
import { get, isEmpty } from 'lodash';

import { verifyJwtToken } from '../../utils/jwt/util';
import { sendErrorResponse } from '../../utils/send-response/util';
import { MiddlewareResult } from '../type';

const validateAuthorizationMiddleware = [
  (req: Request, res: Response, next: NextFunction): MiddlewareResult => {
    const accessToken = (get(req.headers, 'authorization') || '').split(' ')[1];

    try {
      if (!accessToken) {
        throw new JsonWebTokenError('No access token provided');
      }

      const decoded = verifyJwtToken(accessToken);
      if (isEmpty(decoded)) {
        throw new JsonWebTokenError('Access verification failed');
      }
      req.user = decoded;
    } catch (error: any) {
      if (error.name === 'TokenExpiredError') {
        return sendErrorResponse(
          res,
          202,
          `Access token expired (error=${error.message})`,
        );
      } else {
        return sendErrorResponse(
          res,
          404,
          `Invalid access token (error=${error.message})`,
        );
      }
    }

    next();
  },
];

export default validateAuthorizationMiddleware;
