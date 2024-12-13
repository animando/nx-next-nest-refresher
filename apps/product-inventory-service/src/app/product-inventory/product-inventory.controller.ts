import { MessagePattern } from '@nestjs/microservices';
import { ProductInventoryService } from './product-inventory.service';
import { Controller } from '@nestjs/common';

@Controller()
export class ProductInventoryController {
  constructor(private readonly productInventory: ProductInventoryService) {}

  @MessagePattern('inventory.get')
  getInventory() {

    return this.productInventory.getInventory();
  }
}
