import { Inject, Injectable } from '@nestjs/common';
import { InventoryItem, inventoryItemSchema } from './product-inventory.schema';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom} from 'rxjs';
import { PRODUCT_INVENTORY_CLIENT } from './symbols';
@Injectable()
export class ProductInventoryService {
  constructor(@Inject(PRODUCT_INVENTORY_CLIENT) private readonly productInventoryClient:ClientProxy) {}

  async getInventory(): Promise<InventoryItem[]> {
    const response = await firstValueFrom(this.productInventoryClient.send("inventory.get", "payload"));
    return inventoryItemSchema.array().parse(response);
  }
}
