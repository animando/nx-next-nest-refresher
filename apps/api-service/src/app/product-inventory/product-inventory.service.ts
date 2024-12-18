import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { InventoryItem, inventoryItemSchema } from './product-inventory.schema';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { PRODUCT_INVENTORY_CLIENT } from './symbols';
import { logger } from '@org/logger';
import { Queue } from 'bullmq';
import { InjectQueue } from '@nestjs/bullmq';

@Injectable()
export class ProductInventoryService {
  constructor(
    @Inject(PRODUCT_INVENTORY_CLIENT)
    private readonly productInventoryClient: ClientProxy,
    @InjectQueue('queued-tasks') private tasksQueue: Queue<InventoryItem>
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
      inventoryItems.map((item) => this.tasksQueue.add('updateInventory', item))
    );
    logger.info('sent n queue messages', { n: inventoryItems.length });
  }
}
