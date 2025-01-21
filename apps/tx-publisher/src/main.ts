/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { logger } from '@animando/logger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { logger });

  // Uncomment these lines to use the Redis adapter:
  // const redisIoAdapter = new RedisIoAdapter(app);
  // await redisIoAdapter.connectToRedis();
  // app.useWebSocketAdapter(redisIoAdapter);

  const port = process.env.PORT || 12222;
  await app.listen(port);
  logger.info(`Application is running on: ${await app.getUrl()}`);
}

bootstrap();
