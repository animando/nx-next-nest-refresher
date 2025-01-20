/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions } from '@nestjs/microservices';
import { AppModule } from './app/app.module';
import { logger } from '@animando/logger';
import { RabbitConfigService, createRabbitConfig } from '@animando/rabbit';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: logger,
  });

  app.connectMicroservice<MicroserviceOptions>(
    createRabbitConfig(app.get(RabbitConfigService))
  );

  await app.startAllMicroservices();
  await app.init();
}

bootstrap();
