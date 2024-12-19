import { Module } from '@nestjs/common';
import {
  ClientProvider,
  ClientsModule,
  Transport,
} from '@nestjs/microservices';
import { RABBIT_CLIENT } from './rabbit';
import { RabbitConfigModule } from './config/rabbit.config.module';
import { RabbitConfigService } from './config/rabbit.config.service';

export const createRabbitConfig = (
  configService: RabbitConfigService
): ClientProvider => ({
  transport: Transport.RMQ,
  options: {
    urls: [configService.url],
    queue: configService.queueName,
    queueOptions: {
      durable: false,
    },
  },
});

const rabbitModule = ClientsModule.registerAsync({
  clients: [
    {
      name: RABBIT_CLIENT,
      imports: [RabbitConfigModule],
      inject: [RabbitConfigService],
      useFactory: createRabbitConfig,
    },
  ],
});

@Module({
  imports: [rabbitModule],
  exports: [rabbitModule],
})
export class RabbitModule {}
