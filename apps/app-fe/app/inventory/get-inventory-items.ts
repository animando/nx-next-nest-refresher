import { getServersideGraphqlClient } from '../../src/graphql/create-serverside-graphql-client';
import {
  InventoryDocument,
  InventoryQuery,
} from './generated/product-information';
const client = getServersideGraphqlClient();

export const getInventoryItems = async () => {
  console.log('getInventoryItems using server client');
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
