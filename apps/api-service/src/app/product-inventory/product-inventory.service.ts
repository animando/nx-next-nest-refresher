import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import {
  InjectInventoryTaskQueue,
  InventoryItem,
  inventoryItemSchema,
} from '@animando/inventory';
import { logger } from '@animando/logger';
import { Queue } from 'bullmq';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { TOPIC_EXCHANGE_NAME } from '@animando/rabbit';

type BulkJob = Parameters<Queue['addBulk']>[0][number];

@Injectable()
export class ProductInventoryService implements OnModuleInit {
  constructor(
    @Inject(AmqpConnection)
    private readonly rabbitClient: AmqpConnection,
    @InjectInventoryTaskQueue()
    private inventoryTasksQueue: Queue<InventoryItem>
  ) {}

  onModuleInit() {
    this.inventoryTasksQueue.setGlobalConcurrency(2);
  }

  async getInventory(): Promise<InventoryItem[]> {
    const response = await this.rabbitClient.request<InventoryItem[]>({
      exchange: TOPIC_EXCHANGE_NAME,
      routingKey: 'inventory.get',
    });

    const inventoryItems = inventoryItemSchema.array().parse(response);

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
