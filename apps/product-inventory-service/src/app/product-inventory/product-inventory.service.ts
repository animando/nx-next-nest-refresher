import { Injectable } from '@nestjs/common';
import { ProductInventoryRepository } from './product-inventory.repository';
import { InventoryItem, PriceDetails } from '@org/inventory';
import { InventoryItem as DbInventoryItem } from '@prisma/client';

const mapPriceDetails = (_item: DbInventoryItem): PriceDetails =>
  Math.random() > 0.5
    ? {
        type: 'oneoff',
        price: 1,
      }
    : {
        type: 'subscription',
        initialPrice: 1,
        monthlyPrice: 2,
        subscriptionDurationMonths: 3,
      };

const mapToInventoryItem = (item: DbInventoryItem): InventoryItem => ({
  ...item,
  priceDetails: mapPriceDetails(item),
});
@Injectable()
export class ProductInventoryService {
  constructor(private readonly repository: ProductInventoryRepository) {}

  async getInventory(): Promise<InventoryItem[]> {
    const items = await this.repository.getAllInventoryItems();
    return items.map(mapToInventoryItem);
  }
}
