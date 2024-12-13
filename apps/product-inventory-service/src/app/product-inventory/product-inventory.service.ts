import { Injectable } from '@nestjs/common';
import { ProductInventoryRepository } from './product-inventory.repository';

@Injectable()
export class ProductInventoryService {
  constructor(private readonly repository: ProductInventoryRepository) {}

  getInventory() {
    return this.repository.getAllInventoryItems()
  }
}
