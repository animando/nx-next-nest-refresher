import { Injectable } from '@nestjs/common';

@Injectable()
export class ProductInventoryService {
  getInventory() {
    return [{id: "1", sku:"sku", name: 'name'}]
  }
}
