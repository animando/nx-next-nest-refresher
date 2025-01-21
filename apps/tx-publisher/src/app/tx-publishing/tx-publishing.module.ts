import { Module } from '@nestjs/common';
import { WebsocketEventsGateway } from './ws-events-gateway.service';
import { ScheduleModule } from '@nestjs/schedule';
import { TxPublishingService } from './tx-publishing.service';
import { RabbitModule } from '@animando/rabbit';

@Module({
  imports: [ScheduleModule.forRoot(), RabbitModule],
  controllers: [],
  providers: [WebsocketEventsGateway, TxPublishingService],
})
export class TxPublishingModule {}
