'use client';

import { Provider } from 'urql';
import { client } from '../../client';
import { InventoryList } from './inventory-list';

export const InventoryListContainer = () => {
  return (
    <Provider value={client}>
      <InventoryList />
    </Provider>
  );
};
