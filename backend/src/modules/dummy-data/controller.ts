import { Request, Response } from 'express';

import { SendResponseResult } from '../../utils/send-response/type';
import {
  sendErrorResponse,
  sendSuccessResponse,
} from '../../utils/send-response/util';

import DummyDataService from './service';

class DummyDataController {
  async getDummyData(req: Request, res: Response): Promise<SendResponseResult> {
    try {
      return sendSuccessResponse(
        res,
        201,
        await DummyDataService.getDummyData(),
      );
    } catch (error: any) {
      return sendErrorResponse(
        res,
        400,
        `Failed to get dummy data (error=${error.message})`,
      );
    }
  }
}

export default new DummyDataController();
