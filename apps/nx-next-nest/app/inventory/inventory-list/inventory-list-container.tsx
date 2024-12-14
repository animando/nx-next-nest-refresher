'use client';

import { useQuery } from '@urql/next';
import {
  InventoryDocument,
  InventoryQuery,
} from '../generated/product-information';
import { useCallback, useEffect } from 'react';
import { InventoryListView } from './inventory-list-view';
import { usePersistentStore } from '../../../src/store/store';

export const InventoryListContainer = () => {
  const [{ data }, revalidate] = useQuery<InventoryQuery>({
    query: InventoryDocument,
  });
  const { items, setInventory } = usePersistentStore();

  useEffect(() => {
    console.log('inventory changed');
    setInventory(data?.inventory || []);
  }, [data?.inventory, setInventory]);

  const onRefresh = useCallback(() => {
    revalidate({ requestPolicy: 'network-only' });
  }, [revalidate]);

  return <InventoryListView items={items} onRefresh={onRefresh} />;
};
