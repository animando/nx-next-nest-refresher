import { PriceDetails } from '@animando/inventory';
import { ProductInventoryService } from './product-inventory.service';
import { ResolveField, Resolver } from '@nestjs/graphql';

@Resolver('PriceDetails')
export class PriceDetailsResolver {
  constructor(private readonly productInventory: ProductInventoryService) {}
  @ResolveField()
  __resolveType(value: PriceDetails) {
    if (value.type === 'oneoff') {
      return 'OneOffPriceDetails';
    } else if (value.type === 'subscription') {
      return 'SubscriptionPriceDetails';
    }
    return null;
  }
}
