import { InventoryItem } from '@animando/inventory';
import { InventoryQuery, InventoryResolver } from './decorators';
import { ProductInventoryService } from './product-inventory.service';

@InventoryResolver()
export class ProductInventoryResolver {
  constructor(private readonly productInventory: ProductInventoryService) {}

  @InventoryQuery()
  async getInventory(): Promise<InventoryItem[]> {
    const rs = await this.productInventory.getInventory();
    return rs;
  }
}
