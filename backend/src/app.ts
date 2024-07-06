import express from 'express';

import { initializeDatabase } from './configs/di/config';
import userRoute from './routes/user/route';
import logger from './utils/logger/util';

const app = express();
const port = 3000;

app.use(express.json());
app.use('/api/user', userRoute);

app.listen(port, async () => {
  try {
    await initializeDatabase();

    logger.info(`Server is running on http://localhost:${port}`);
  } catch (error: any) {
    logger.error(error);

    process.exit(1);
  }
});
