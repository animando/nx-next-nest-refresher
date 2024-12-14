import { Module } from '@nestjs/common';
import { LoggerModule as NestLoggerModule } from 'nestjs-pino';
import { loggerOptions } from './logger';

@Module({
  controllers: [],
  providers: [],
  exports: [],
  imports: [NestLoggerModule.forRoot(loggerOptions)],
})
export class LoggerModule {}
