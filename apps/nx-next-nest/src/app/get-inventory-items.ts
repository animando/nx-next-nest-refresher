import { client } from '../client';
import {
  InventoryDocument,
  InventoryQuery,
} from '../generated/product-information-server';

export const getInventoryItems = async () => {
  const { error, data } = await client.query<InventoryQuery>(
    InventoryDocument,
    {}
  );
  const inventory = data?.inventory;
  if (error) {
    throw error;
  }
  return inventory;
};
