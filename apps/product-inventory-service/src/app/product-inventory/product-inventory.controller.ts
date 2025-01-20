import { MessagePattern } from '@nestjs/microservices';
import { ProductInventoryService } from './product-inventory.service';
import { Controller } from '@nestjs/common';
import { logger } from '@org/logger';

@Controller()
export class ProductInventoryController {
  constructor(private readonly productInventory: ProductInventoryService) {}

  @MessagePattern('inventory.get')
  getInventory() {
    logger.info('get inventory');
    return this.productInventory.getInventory();
  }
}
