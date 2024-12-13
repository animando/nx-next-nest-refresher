import { ProductInventoryService } from './product-inventory.service';
import { Query, Resolver } from '@nestjs/graphql';
import { InventoryItem } from './product-inventory.schema';

@Resolver('MyResolver')
export class ProductInventoryController {
  constructor(private readonly productInventory: ProductInventoryService) {}

  @Query('inventory')
  async getInventory(): Promise<InventoryItem[]> {
    const rs = await this.productInventory.getInventory();
    return rs;
  }
}
