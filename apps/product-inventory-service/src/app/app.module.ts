import { Module } from '@nestjs/common';
import { ProductInventoryModule } from './product-inventory/product-inventory.module';
import { LoggerModule } from '@animando/logger';
// import { RabbitConfigModule } from '@animando/rabbit';
@Module({
  imports: [ProductInventoryModule, LoggerModule],
})
export class AppModule {}
