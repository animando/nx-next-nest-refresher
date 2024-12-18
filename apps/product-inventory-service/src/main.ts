/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app/app.module';
import { logger } from '@org/logger';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      logger: logger,
      transport: Transport.RMQ,
      options: {
        urls: [`amqp://${process.env.RABBIT_HOST}:${process.env.RABBIT_PORT}`],
        queue: process.env.RABBIT_QUEUE_NAME,
        queueOptions: {
          durable: false,
        },
      },
    }
  );

  await app.listen();
}

bootstrap();
