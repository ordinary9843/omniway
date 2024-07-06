import { Request, Response } from 'express';

import { SendResponseResult } from '../../utils/send-response/type';
import {
  sendErrorResponse,
  sendSuccessResponse,
} from '../../utils/send-response/util';

import UserService from './service';

class UserController {
  async register(req: Request, res: Response): Promise<SendResponseResult> {
    try {
      return sendSuccessResponse(
        res,
        201,
        await UserService.register(req.body),
      );
    } catch (error: any) {
      return sendErrorResponse(
        res,
        400,
        `Failed to register user (error=${error.message})`,
      );
    }
  }

  async login(req: Request, res: Response): Promise<SendResponseResult> {
    try {
      return sendSuccessResponse(res, 200, await UserService.login(req.body));
    } catch (error: any) {
      return sendErrorResponse(
        res,
        204,
        `Failed to login (error=${error.message})`,
      );
    }
  }

  async validateRefreshToken(
    req: Request,
    res: Response,
  ): Promise<SendResponseResult> {
    try {
      return sendSuccessResponse(
        res,
        200,
        await UserService.validateRefreshToken(req.body),
      );
    } catch (error: any) {
      return sendErrorResponse(
        res,
        204,
        `Failed to refresh token (error=${error.message})`,
      );
    }
  }
}

export default new UserController();
