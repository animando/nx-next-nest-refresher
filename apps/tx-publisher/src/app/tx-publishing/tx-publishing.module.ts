import { Module } from '@nestjs/common';
import { TxGeneratorService } from './tx-generator.service';
import { ScheduleModule } from '@nestjs/schedule';
import { TxPublishingService } from './tx-publishing.service';
import { RabbitModule } from '@animando/rabbit';

@Module({
  imports: [ScheduleModule.forRoot(), RabbitModule],
  controllers: [],
  providers: [TxGeneratorService, TxPublishingService],
})
export class TxPublishingModule {}
