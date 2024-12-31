'use client';

import { useQuery } from '@urql/next';
import {
  InventoryDocument,
  InventoryQuery,
} from '../generated/product-information';
import { useCallback, useEffect } from 'react';
import { InventoryListView } from './inventory-list-view';
import { usePersistentStore } from '../../../src/store/store';
import { InventoryItem } from '@org/inventory';

const mapInventoryData = (
  data: InventoryQuery['inventory']
): InventoryItem[] => {
  return data.map<InventoryItem>((item) => {
    return {
      ...item,
      priceDetails:
        item.priceDetails.__typename === 'OneOffPriceDetails'
          ? {
              type: 'oneoff',
              price: item.priceDetails.price,
            }
          : {
              type: 'subscription',
              initialPrice: item.priceDetails.initialPrice,
              monthlyPrice: item.priceDetails.monthlyPrice,
              subscriptionDurationMonths:
                item.priceDetails.subscriptionDurationMonths,
            },
    };
  });
};

export const InventoryListContainer = () => {
  const [{ data }, revalidate] = useQuery<InventoryQuery>({
    query: InventoryDocument,
  });
  const { items, setInventory } = usePersistentStore();

  useEffect(() => {
    console.log('inventory changed');
    setInventory(mapInventoryData(data?.inventory || []));
  }, [data?.inventory, setInventory]);

  const onRefresh = useCallback(() => {
    revalidate({ requestPolicy: 'network-only' });
  }, [revalidate]);

  return <InventoryListView items={items} onRefresh={onRefresh} />;
};
