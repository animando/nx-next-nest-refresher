/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { logger } from '@org/logger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { logger: logger });
  const port = process.env.PORT || 22200;
  app.enableCors();
  await app.listen(port);
  logger.info(`🚀 Application is running on: http://localhost:${port}`);
}

bootstrap();
