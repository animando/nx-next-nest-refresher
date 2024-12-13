'use client';

import { useQuery } from '@urql/next';
import {
  InventoryDocument,
  InventoryItem as InventoryItemType,
} from '../../generated/product-information';
import { useCallback } from 'react';

export const InventoryItem = ({ item }: { item: InventoryItemType }) => {
  return (
    <tr>
      <td>{item.sku}</td>
      <td>{item.name}</td>
    </tr>
  );
};

export const InventoryItems = ({ items }: { items: InventoryItemType[] }) => {
  return (
    <>
      {items.map((item) => (
        <InventoryItem key={item.id} item={item} />
      ))}
    </>
  );
};

export const InventoryList = () => {
  const [{ data }, revalidate] = useQuery({ query: InventoryDocument });

  const inventoryItems = data?.inventory;

  const refresh = useCallback(() => {
    revalidate({ requestPolicy: 'network-only' });
  }, [revalidate]);

  return (
    <div>
      <table>
        <thead>
          <tr>
            <td colSpan={3}>Inventory items</td>
          </tr>
        </thead>
        <tbody>
          {!inventoryItems ||
            (!inventoryItems?.length && (
              <tr>
                <td colSpan={3}>Empty list</td>
              </tr>
            ))}
          {inventoryItems?.length && <InventoryItems items={inventoryItems} />}
        </tbody>
      </table>
      <button onClick={refresh}>Refresh</button>
    </div>
  );
};
