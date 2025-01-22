import { Module } from '@nestjs/common';
import { RabbitConfigModule } from './config/rabbit.config.module';
import { RabbitConfigService } from './config/rabbit.config.service';
import { RabbitMQConfig, RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import {
  DIRECT_EXCHANGE_NAME,
  FANOUT_EXCHANGE_NAME,
  TOPIC_EXCHANGE_NAME,
  WEBSOCKETS_EXCHANGE_NAME,
} from './rabbit';

const createRabbitConfig = (config: RabbitConfigService): RabbitMQConfig => ({
  exchanges: [
    {
      name: TOPIC_EXCHANGE_NAME,
      type: 'topic',
    },
    {
      name: FANOUT_EXCHANGE_NAME,
      type: 'fanout',
    },
    {
      name: DIRECT_EXCHANGE_NAME,
      type: 'direct',
    },
    {
      name: WEBSOCKETS_EXCHANGE_NAME,
      type: 'topic',
    },
  ],
  uri: config.url,
  connectionInitOptions: { wait: false },
  enableControllerDiscovery: true,
});

const rabbitModule = RabbitMQModule.forRootAsync(RabbitMQModule, {
  imports: [RabbitConfigModule],
  inject: [RabbitConfigService],
  useFactory: createRabbitConfig,
});

@Module({
  imports: [rabbitModule],
  exports: [rabbitModule],
})
export class RabbitModule {}
