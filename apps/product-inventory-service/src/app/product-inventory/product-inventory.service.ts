import { Injectable } from '@nestjs/common';
import { ProductInventoryRepository } from './product-inventory.repository';
import { InventoryItem, PriceDetails } from '@animando/inventory';
import { InventoryItem as DbInventoryItem } from '@prisma/client';

const mapPriceDetails = (item: DbInventoryItem): PriceDetails => {
  if (item.initialPrice !== null) {
    if (item.recurringPrice === null) {
      return {
        type: 'oneoff',
        price: item.initialPrice,
      };
    } else if (
      item.recurringPrice !== null &&
      item.subscriptionLength !== null
    ) {
      return {
        type: 'subscription',
        initialPrice: item.initialPrice,
        monthlyPrice: item.recurringPrice,
        subscriptionDurationMonths: item.subscriptionLength,
      };
    }
  }
  throw new Error('invalid price data');
};

const mapToInventoryItem = (item: DbInventoryItem): InventoryItem => ({
  ...item,
  currency: item.currency,
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
