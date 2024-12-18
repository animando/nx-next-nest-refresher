import { Injectable } from '@nestjs/common';
import {
  InjectInventoryTaskQueue,
  InventoryItem,
  inventoryItemSchema,
} from '@org/inventory';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { logger } from '@org/logger';
import { Queue } from 'bullmq';
import { InjectProductInventoryClient } from './decorators';

@Injectable()
export class ProductInventoryService {
  constructor(
    @InjectProductInventoryClient()
    private readonly productInventoryClient: ClientProxy,
    @InjectInventoryTaskQueue()
    private inventoryTasksQueue: Queue<InventoryItem>
  ) {}

  async getInventory(): Promise<InventoryItem[]> {
    const response = await firstValueFrom(
      this.productInventoryClient.send('inventory.get', 'payload')
    );

    const inventoryItems = inventoryItemSchema.array().parse(response);
    await this.updateInventoryItems(inventoryItems);

    return inventoryItems;
  }

  private async updateInventoryItems(inventoryItems: InventoryItem[]) {
    await Promise.all(
      inventoryItems.map((item) =>
        this.inventoryTasksQueue.add('updateInventory', item)
      )
    );
    logger.info('sent n queue messages', { n: inventoryItems.length });
  }
}
