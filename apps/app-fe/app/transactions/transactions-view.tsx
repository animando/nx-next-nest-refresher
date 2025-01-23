import { UITransaction } from './types';

import { useVirtualizer } from '@tanstack/react-virtual';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import type { ColumnDef, SortingState } from '@tanstack/react-table';
import { formatDate } from 'date-fns';
import { useMemo, useRef, useState } from 'react';
import { useInfiniteScroll } from '../../src/utils/paging';

type TransactionsViewProps = {
  transactions: UITransaction[];
  hasMore: boolean;
  isLiveConnected: boolean;
  loadMore: () => void;
};
const columnHelper = createColumnHelper<UITransaction>();

export const TransactionsView = ({
  transactions,
  hasMore,
  loadMore,
}: TransactionsViewProps) => {
  const [sorting, setSorting] = useState<SortingState>([
    { id: 'createdAt', desc: true },
  ]);

  const columns = useMemo<Array<ColumnDef<UITransaction, string>>>(
    () => [
      columnHelper.accessor('trxId', {
        cell: (info) => <span>{info.getValue()}</span>,
        header: 'Id',
      }),
      columnHelper.group({
        header: 'Transaction Details',
        columns: [
          columnHelper.accessor('transactionType', {
            cell: (info) => info.getValue(),
            header: 'Type',
          }),
          columnHelper.accessor('transactionDescription', {
            cell: (info) => info.getValue(),
            header: 'Description',
            minSize: 600,
            enableSorting: false,
          }),
        ],
      }),
      columnHelper.accessor('transactionDate', {
        cell: (info) => formatDate(info.getValue(), 'dd-MM-yyyy HH:mm:ss'),
        header: 'Transaction Date',
      }),
      columnHelper.accessor('createdAt', {
        cell: (info) => info.getValue(),
        header: () => 'Ledger Date',
        enableSorting: true,
        sortingFn: 'datetime',
        sortDescFirst: true,
      }),
    ],
    []
  );

  const table = useReactTable({
    data: transactions,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    debugTable: false,
  });

  const { rows } = table.getRowModel();

  const parentRef = useRef<HTMLDivElement>(null);

  const virtualizer = useVirtualizer({
    count: rows.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 60,
    overscan: 5,
  });

  useInfiniteScroll(virtualizer, transactions, loadMore, hasMore);

  const virtualItems = virtualizer.getVirtualItems();

  return (
    <div ref={parentRef} className="max-h-[600px]" style={{ overflow: 'auto' }}>
      <div style={{ height: `${virtualizer.getTotalSize()}px` }}>
        <table>
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <th
                      key={header.id}
                      colSpan={header.colSpan}
                      style={{ width: header.getSize() }}
                    >
                      {header.isPlaceholder ? null : (
                        <div
                          {...{
                            className: header.column.getCanSort()
                              ? 'cursor-pointer select-none'
                              : '',
                            onClick: header.column.getToggleSortingHandler(),
                          }}
                        >
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                          {{
                            asc: ' 🔼',
                            desc: ' 🔽',
                          }[header.column.getIsSorted() as string] ?? null}
                        </div>
                      )}
                    </th>
                  );
                })}
              </tr>
            ))}
          </thead>
          <tbody>
            {virtualItems.map((virtualRow, index) => {
              const row = rows[virtualRow.index];
              return (
                <tr
                  key={row.id}
                  style={{
                    height: `${virtualRow.size}px`,
                    transform: `translateY(${
                      virtualRow.start - index * virtualRow.size
                    }px)`,
                  }}
                >
                  {row.getVisibleCells().map((cell) => {
                    return (
                      <td key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
