import { Module } from '@nestjs/common';
import { RabbitModule } from '@animando/rabbit';
import { WebsocketEventsGateway } from './ws-events-gateway.service';
import { WebsocketsController } from './websockets.controller';

@Module({
  controllers: [WebsocketsController],
  imports: [RabbitModule],
  providers: [WebsocketEventsGateway],
})
export class WebsocketsModule {}
