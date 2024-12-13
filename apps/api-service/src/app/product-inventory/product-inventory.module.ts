import { Module } from '@nestjs/common';
import { ProductInventoryController } from './product-inventory.controller';
import { ProductInventoryService } from './product-inventory.service';

@Module({
  imports: [],
  controllers: [ProductInventoryController],
  providers: [ProductInventoryService],
})
export class ProductInventoryModule {}
