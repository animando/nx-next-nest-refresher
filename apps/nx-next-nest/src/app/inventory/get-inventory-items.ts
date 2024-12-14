import {
  InventoryDocument,
  InventoryQuery,
} from './generated/product-information';
import { getServersideGraphqlClient } from '../../create-serverside-graphql-client';
const client = getServersideGraphqlClient();

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
