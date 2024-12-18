import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RabbitConfigService } from './rabbit.config.service';

@Module({
  imports: [ConfigModule],
  providers: [RabbitConfigService],
  exports: [RabbitConfigService],
})
export class RabbitConfigModule {}
