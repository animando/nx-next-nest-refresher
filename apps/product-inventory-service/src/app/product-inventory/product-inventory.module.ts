import { Module } from '@nestjs/common';
import { ProductInventoryService } from './product-inventory.service';
import { ProductInventoryController } from './product-inventory.controller';
import { PrismaService } from './prisma.service';
import { ProductInventoryRepository } from './product-inventory.repository';
import { TaskConsumer } from './task-consumer';
import { QueueModule } from '@org/queue';
import { INVENTORY_TASKS_QUEUE } from '@org/inventory';

@Module({
  imports: [QueueModule.register(INVENTORY_TASKS_QUEUE)],
  controllers: [ProductInventoryController],
  providers: [
    ProductInventoryService,
    PrismaService,
    ProductInventoryRepository,
    TaskConsumer,
    
  ],
})
export class ProductInventoryModule {}
