import { Injectable, OnModuleInit } from '@nestjs/common';
import {
  InjectInventoryTaskQueue,
  InventoryItem,
  inventoryItemSchema,
} from '@org/inventory';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { logger } from '@org/logger';
import { Queue } from 'bullmq';
import { InjectRabbitClient } from './decorators';

type BulkJob = Parameters<Queue['addBulk']>[0][number];

@Injectable()
export class ProductInventoryService implements OnModuleInit {
  constructor(
    @InjectRabbitClient()
    private readonly rabbitClient: ClientProxy,
    @InjectInventoryTaskQueue()
    private inventoryTasksQueue: Queue<InventoryItem>
  ) {}

  onModuleInit() {
    this.inventoryTasksQueue.setGlobalConcurrency(2);
  }

  async getInventory(): Promise<InventoryItem[]> {
    const response = await firstValueFrom(
      this.rabbitClient.send('inventory.get', {})
    );

    const inventoryItems = inventoryItemSchema.array().parse(response);
    await this.updateInventoryItems(inventoryItems);

    return inventoryItems;
  }

  private async updateInventoryItems(inventoryItems: InventoryItem[]) {
    const jobsData = inventoryItems.map<BulkJob>((item) => ({
      name: 'updateInventory',
      data: item,
    }));
    this.inventoryTasksQueue.addBulk(jobsData);
    logger.info('sent n queue messages', { n: inventoryItems.length });
  }
}
