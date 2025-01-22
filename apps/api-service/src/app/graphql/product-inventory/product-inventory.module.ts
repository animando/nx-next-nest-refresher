import { Module } from '@nestjs/common';
import { ProductInventoryResolver } from './product-inventory.resolver';
import { ProductInventoryService } from './product-inventory.service';
import { QueueModule } from '@animando/queue';
import { INVENTORY_TASKS_QUEUE } from '@animando/inventory';
import { RabbitModule } from '@animando/rabbit';
import { PriceDetailsResolver } from './price-details.resolver';

@Module({
  imports: [RabbitModule, QueueModule.register(INVENTORY_TASKS_QUEUE)],
  providers: [
    ProductInventoryService,
    ProductInventoryResolver,
    PriceDetailsResolver,
  ],
})
export class ProductInventoryModule {}
