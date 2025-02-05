'use client';

import { InventoryItem } from '@animando/inventory';

type InventoryListItemProps = {
  item: InventoryItem;
};

const getItemPrice = (priceDetails: InventoryItem['priceDetails']) => {
  switch (priceDetails.type) {
    case 'oneoff':
      return priceDetails.price;
    case 'subscription':
      return priceDetails.initialPrice;
    default:
      return undefined;
  }
};
const getRecurringPrice = (priceDetails: InventoryItem['priceDetails']) => {
  switch (priceDetails.type) {
    case 'subscription':
      return {
        amount: priceDetails.monthlyPrice,
        duration: priceDetails.initialPrice,
      };
    default:
      return undefined;
  }
};
export const PriceDetails = ({ item }: InventoryListItemProps) => {
  console.log('render price details');
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
