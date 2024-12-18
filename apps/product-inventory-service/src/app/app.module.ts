import { Module } from '@nestjs/common';
import { ProductInventoryModule } from './product-inventory/product-inventory.module';
import { LoggerModule } from '@org/logger';
import { RabbitConfigModule } from '@org/rabbit';
@Module({
  imports: [ProductInventoryModule, LoggerModule, RabbitConfigModule],
})
export class AppModule {}
