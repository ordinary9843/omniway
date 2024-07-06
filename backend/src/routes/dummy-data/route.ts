import { Router } from 'express';

import validateAuthorizationMiddleware from '../../middlewares/validate-authorization/middleware';
import DummyDataController from '../../modules/dummy-data/controller';

const dummyDataRoute = Router();
dummyDataRoute.get(
  '/dummy-data',
  validateAuthorizationMiddleware,
  DummyDataController.getDummyData,
);

export default dummyDataRoute;
