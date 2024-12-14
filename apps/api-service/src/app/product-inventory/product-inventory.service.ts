import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { InventoryItem, inventoryItemSchema } from './product-inventory.schema';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { PRODUCT_INVENTORY_CLIENT } from './symbols';
import { logger } from '@org/logger';

@Injectable()
export class ProductInventoryService implements OnModuleInit {
  constructor(
    @Inject(PRODUCT_INVENTORY_CLIENT)
    private readonly productInventoryClient: ClientProxy
  ) {}

  onModuleInit() {
    logger.debug('product inventory service - init');
  }

  async getInventory(): Promise<InventoryItem[]> {
    const response = await firstValueFrom(
      this.productInventoryClient.send('inventory.get', 'payload')
    );
    return inventoryItemSchema.array().parse(response);
  }
}
