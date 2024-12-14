import { Module } from '@nestjs/common';
import { ProductInventoryModule } from './product-inventory/product-inventory.module';
import { LoggerModule } from '@org/logger';

@Module({
  imports: [ProductInventoryModule, LoggerModule],
})
export class AppModule {}
