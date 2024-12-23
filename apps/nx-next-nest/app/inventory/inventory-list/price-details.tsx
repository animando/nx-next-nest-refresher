'use client';

import {
  InventoryItem,
  PriceDetails as PriceDetailsType,
} from '../generated/product-information';

type InventoryListItemProps = {
  item: InventoryItem;
};

const getItemPrice = (priceDetails: PriceDetailsType) => {
  switch (priceDetails.__typename) {
    case 'OneOffPriceDetails':
      return priceDetails.price;
    case 'SubscriptionPriceDetails':
      return priceDetails.initialPrice;
    default:
      return undefined;
  }
};
const getRecurringPrice = (priceDetails: PriceDetailsType) => {
  switch (priceDetails.__typename) {
    case 'SubscriptionPriceDetails':
      return {
        amount: priceDetails.monthlyPrice,
        duration: priceDetails.initialPrice,
      };
    default:
      return undefined;
  }
};
export const PriceDetails = ({ item }: InventoryListItemProps) => {
  const itemPrice = getItemPrice(item.priceDetails);
  const recurringPrice = getRecurringPrice(item.priceDetails);

  return (
    <p>
      {itemPrice}{' '}
      {recurringPrice && (
        <span>
          (then {recurringPrice.amount} for {recurringPrice.duration} months)
        </span>
      )}
    </p>
  );
};
