'use client';

import { useQuery } from '@urql/next';
import {
  InventoryDocument,
  InventoryQuery,
} from '../generated/product-information';
import { useCallback } from 'react';
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from '@nextui-org/react';

export const InventoryList = () => {
  const [{ data }, revalidate] = useQuery<InventoryQuery>({
    query: InventoryDocument,
  });

  const inventoryItems = data?.inventory;

  const refresh = useCallback(() => {
    revalidate({ requestPolicy: 'network-only' });
  }, [revalidate]);

  return (
    <div>
      <Table>
        <TableHeader>
          <TableColumn>Id</TableColumn>
          <TableColumn>name</TableColumn>
        </TableHeader>
        <TableBody emptyContent={!inventoryItems?.length}>
          {(inventoryItems || []).map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.sku}</TableCell>
              <TableCell>{item.name}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Button onPress={refresh}>Refresh</Button>
    </div>
  );
};
