import { Module, OnModuleInit } from '@nestjs/common';
import { ProductInventoryModule } from './product-inventory/product-inventory.module';
import { LoggerModule, logger } from '@org/logger';

@Module({
  imports: [ProductInventoryModule, LoggerModule],
})
export class AppModule implements OnModuleInit {
  onModuleInit() {
    logger.debug('logging with imported logger');
  }
}
