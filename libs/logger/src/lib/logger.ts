import { PinoLogger } from 'nestjs-pino';

export const loggerOptions = {
  pinoHttp: {
    level: 'debug',
  },
};

export const logger = new PinoLogger(loggerOptions);
