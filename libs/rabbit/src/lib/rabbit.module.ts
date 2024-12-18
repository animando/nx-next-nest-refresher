import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { RABBIT_CLIENT } from './rabbit';
import { RabbitConfigModule } from './config/rabbit.config.module';
import { RabbitConfigService } from './config/rabbit.config.service';

const rabbitModule = ClientsModule.registerAsync({
  clients: [
    {
      name: RABBIT_CLIENT,
      imports: [RabbitConfigModule],
      inject: [RabbitConfigService],
      useFactory: (configService: RabbitConfigService) => ({
        transport: Transport.RMQ,
        options: {
          urls: [configService.url],
          queue: process.env.RABBIT_QUEUE_NAME,
          queueOptions: {
            durable: false,
          },
        },
      }),
    },
  ],
});

@Module({
  imports: [rabbitModule],
  exports: [rabbitModule],
})
export class RabbitModule {}
