import { resolve } from 'path';

import { DateTime } from 'luxon';
import { createLogger, format, transports } from 'winston';

const logger = createLogger({
  level: 'info',
  format: format.json(),
  transports: [
    new transports.Console(),
    new transports.File({
      filename: resolve(
        __dirname,
        `../../../logs/${DateTime.local().toFormat('yyyyMMdd')}-error.log`,
      ),
      level: 'error',
    }),
  ],
});

export default logger;
