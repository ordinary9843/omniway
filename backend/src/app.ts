import bodyParser from 'body-parser';
import dotenv from 'dotenv';
dotenv.config({
  path: __dirname + '../../.env',
});

import express from 'express';

import { initializeDatabase } from './configs/di/config';
import loggerMiddleware from './middlewares/logger/middleware';
import dummyDataRoute from './routes/dummy-data/route';
import userRoute from './routes/user/route';
import logger from './utils/logger/util';

const app = express();
const port = 3000;
const apiRouter = express.Router();
apiRouter.use('/', dummyDataRoute);
apiRouter.use('/user', userRoute);
app.use(bodyParser.json());
app.use(loggerMiddleware);
app.use('/api', apiRouter);
app.listen(port, async () => {
  try {
    await initializeDatabase();

    logger.info(`Server is running on http://localhost:${port}`);
  } catch (error: any) {
    logger.error(error.message);

    process.exit(1);
  }
});
