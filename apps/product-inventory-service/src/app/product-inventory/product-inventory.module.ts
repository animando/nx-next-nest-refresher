import { Module } from '@nestjs/common';
import { ProductInventoryService } from './product-inventory.service';
import { ProductInventoryController } from './product-inventory.controller';
import { PrismaService } from './prisma.service';
import { ProductInventoryRepository } from './product-inventory.repository';
import { BullModule } from '@nestjs/bullmq';
import { TaskConsumer } from './task-consumer';

@Module({
  imports: [
    BullModule.forRoot({
      connection: {
        host: 'localhost',
        port: 6379,
      },
    }),
    BullModule.registerQueue({
      name: 'queued-tasks',
      connection: {
        host: 'localhost',
        port: 6379,
      },
    }),
  ],
  controllers: [ProductInventoryController],
  providers: [
    ProductInventoryService,
    PrismaService,
    ProductInventoryRepository,
    TaskConsumer,
  ],
})
export class ProductInventoryModule {}
