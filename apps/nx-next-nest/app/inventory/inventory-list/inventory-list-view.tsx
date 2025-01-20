'use client';

import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from '@nextui-org/react';
import { PriceDetails } from './price-details';
import { InventoryItem } from '@animando/inventory';

type InventoryListViewProps = {
  items?: InventoryItem[];
  onRefresh: () => void;
};
export const InventoryListView = ({
  items,
  onRefresh,
}: InventoryListViewProps) => {
  return (
    <div>
      <Table aria-label="Inventory">
        <TableHeader>
          <TableColumn>Id</TableColumn>
          <TableColumn>Name</TableColumn>
          <TableColumn>Currency</TableColumn>
          <TableColumn>Price</TableColumn>
        </TableHeader>
        <TableBody emptyContent={!items?.length}>
          {(items || []).map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.sku}</TableCell>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.currency}</TableCell>
              <TableCell>
                <PriceDetails item={item} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Button onPress={onRefresh} aria-label="Refresh inventory">
        Refresh
      </Button>
    </div>
  );
};
