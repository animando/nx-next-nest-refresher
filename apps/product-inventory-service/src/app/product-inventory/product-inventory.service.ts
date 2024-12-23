import { Injectable } from '@nestjs/common';
import { ProductInventoryRepository } from './product-inventory.repository';
import { InventoryItem, PriceDetails } from '@org/inventory';
import { InventoryItem as DbInventoryItem } from '@prisma/client';

const mapPriceDetails = (item: DbInventoryItem): PriceDetails | undefined => {
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
  return undefined;
};

const mapToInventoryItem = (item: DbInventoryItem): InventoryItem => ({
  ...item,
  currency: item.currency ?? undefined,
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
