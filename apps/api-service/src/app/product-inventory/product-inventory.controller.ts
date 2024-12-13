import { Controller, Get } from '@nestjs/common';
import { ProductInventoryService } from './product-inventory.service';

@Controller()
export class ProductInventoryController {
  constructor(private readonly productInventory: ProductInventoryService) {}

  @Get()
  getData() {
    return this.productInventory.getData();
  }
}
