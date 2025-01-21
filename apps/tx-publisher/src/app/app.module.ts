import { Module } from '@nestjs/common';
import { TxPublishingModule } from './tx-publishing/tx-publishing.module';
import { LoggerModule } from '@animando/logger';

@Module({
  imports: [TxPublishingModule, LoggerModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
