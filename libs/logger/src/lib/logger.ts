import { Params, PinoLogger } from 'nestjs-pino';
import { LoggerService } from '@nestjs/common';

export const loggerOptions: Params = {
  pinoHttp: {
    level: 'debug',
    transport: {
      target: 'pino-pretty',
      options: {
        singleLine: true,
        colorize: true,
        colorizeObjects: true,
        ignore: 'pid,hostname',
      },
    },
    quietReqLogger: true,
    quietResLogger: true,
    autoLogging: false,
  },
};

type LogLevel = 'info' | 'debug' | 'warn' | 'error' | 'fatal' | 'trace';

class Logger implements LoggerService {
  constructor(private readonly logger: PinoLogger) {
    this.info = this.logWithLevel.bind(this, 'info');
    this.log = this.logWithLevel.bind(this, 'debug');
    this.error = this.logWithLevel.bind(this, 'error');
    this.warn = this.logWithLevel.bind(this, 'warn');
    this.debug = this.logWithLevel.bind(this, 'debug');
  }

  logWithLevel(
    level: LogLevel,
    message: string,
    obj: unknown,
    ...args: unknown[]
  ) {
    if (typeof obj === 'undefined') {
      this.logger[level](message, ...args);
    } else if (typeof obj === 'object') {
      this.logger[level](obj, message, args);
    } else {
      this.logger[level](message, obj, ...args);
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  log(message: string, obj?: unknown, ...args: unknown[]) {}
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  info(message: string, obj?: unknown, ...args: unknown[]) {}
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  error(message: string, obj?: unknown, ...args: unknown[]) {}
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  warn(message: string, obj?: unknown, ...args: unknown[]) {}
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  debug(message: string, obj?: unknown, ...args: unknown[]) {}
}

export const logger = new Logger(new PinoLogger(loggerOptions));
