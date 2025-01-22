import { Module } from '@nestjs/common';
import { ProductInventoryModule } from './product-inventory/product-inventory.module';
import { LoggerModule } from '@animando/logger';
import { WebsocketsModule } from './websockets/websockets.module';

@Module({
  imports: [ProductInventoryModule, LoggerModule, WebsocketsModule],
})
export class AppModule {}
