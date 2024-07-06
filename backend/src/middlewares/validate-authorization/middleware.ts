import { Request, Response, NextFunction } from 'express';

import { get, isEmpty } from 'lodash';

import { verifyJwtToken } from '../../utils/jwt/util';
import { sendErrorResponse } from '../../utils/send-response/util';
import { MiddlewareResult } from '../type';

const validateAuthorizationMiddleware = [
  (req: Request, res: Response, next: NextFunction): MiddlewareResult => {
    const accessToken = (get(req.headers, 'authorization') || '').split(' ')[1];
    if (!accessToken) {
      return sendErrorResponse(res, 401, `No access token provided`);
    }

    try {
      const decoded = verifyJwtToken(accessToken);
      if (isEmpty(decoded)) {
        throw new Error('Access verification failed');
      }
      req.user = decoded;
    } catch (error: any) {
      return sendErrorResponse(
        res,
        401,
        `Access verification failed (error=${error.message})`,
      );
    }

    next();
  },
];

export default validateAuthorizationMiddleware;
