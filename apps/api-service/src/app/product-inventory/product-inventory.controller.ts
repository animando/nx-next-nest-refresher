import { ProductInventoryService } from './product-inventory.service';
import { Query, Resolver } from '@nestjs/graphql';
import { InventoryItem } from './product-inventory.schema';

@Resolver('MyResolver')
export class ProductInventoryController {
  constructor(private readonly productInventory: ProductInventoryService) {}

  @Query('inventory')
  getInventory(): InventoryItem[] {
    console.log('get inventory');
    return [
      {
        id: '1',
        name: 'item',
        sku: 'item-1'
      }
    ]
  }
}
