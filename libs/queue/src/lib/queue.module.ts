import { DynamicModule, Module } from '@nestjs/common';
import { ConfigurableModuleClass } from './queue.module.definition';
import { QueueModuleConfig } from './queue.module.config';
import { BullModule } from '@nestjs/bullmq';
import { RedisModule, RedisConnectionOptions } from './redis.module';
import { RedisConnectionOptionsSymbol } from './redis.symbols';
import { QueueConfigModule } from './config/queue.config.module';
import { QueueConfigService } from './config/queue.config.service';

const createBullMqModule = () =>
  BullModule.forRootAsync({
    imports: [RedisModule, QueueConfigModule],
    inject: [RedisConnectionOptionsSymbol, QueueConfigService],
    useFactory: (
      redisConfig: RedisConnectionOptions,
      queueConfig: QueueConfigService
    ) => ({
      connection: redisConfig,
      defaultJobOptions: {
        attempts: queueConfig.defaultAttempts,
        backoff: queueConfig.defaultBackoff,
        removeOnComplete: queueConfig.defaultRemoveOnComplete,
      },
    }),
  });

const createBullMqQueue = (queueName: string) =>
  BullModule.registerQueueAsync({
    name: queueName,
    imports: [RedisModule],
    inject: [RedisConnectionOptionsSymbol],
    useFactory: (redisConfig: RedisConnectionOptions) => ({
      connection: redisConfig,
    }),
  });

const createQueueModules = (
  queueOrQueues: QueueModuleConfig
): DynamicModule[] => {
  const queueNames =
    typeof queueOrQueues === 'string' ? [queueOrQueues] : queueOrQueues;
  const queues = queueNames.map((name) => createBullMqQueue(name));
  return queues;
};

@Module({
  controllers: [],
  providers: [],
  exports: [],
  imports: [],
})
export class QueueModule extends ConfigurableModuleClass {
  static register(queueOrQueues: QueueModuleConfig) {
    const bullmq = createBullMqModule();
    const queues = createQueueModules(queueOrQueues);

    return {
      module: QueueModule,
      imports: [bullmq, ...queues],
      exports: [bullmq, ...queues],
    };
  }
}
