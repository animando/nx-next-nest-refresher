'use client';

import { InventoryItem } from '../generated/product-information';
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from '@nextui-org/react';

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
          <TableColumn>name</TableColumn>
        </TableHeader>
        <TableBody emptyContent={!items?.length}>
          {(items || []).map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.sku}</TableCell>
              <TableCell>{item.name}</TableCell>
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
