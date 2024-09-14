import clsx from 'clsx';
import React from 'react';

import {
  Pagination as TablePagination,
  PaginationProps as TablePaginationProps,
} from '../../pagination';

import { TableBody } from './TableBody';
import { TableCell } from './TableCell';
import { TableElement } from './TableElement';
import { TableHead, TableHeader } from './TableHead';
import { TableRow } from './TableRow';
import { BaseEntity } from './types';

type TableColumn<Entry> = {
  title: string;
  field: keyof Entry;
  className?: string;
  Cell?({ entry, index }: { entry: Entry; index?: number }): React.ReactElement;
};

export type TableProps<Entry> = {
  data: Entry[];
  columns: TableColumn<Entry>[];
  className?: string;
  pagination?: TablePaginationProps;
  onRowClick?: (selectedRowId: string | number) => void;
};

export const Table = <Entry extends BaseEntity>({
  data,
  columns,
  onRowClick,
  pagination,
  className,
}: TableProps<Entry>) => {
  return (
    <>
      <TableElement className={className}>
        <TableHeader>
          <TableRow>
            {columns.map((column, index) => (
              <TableHead key={column.title + index}>{column.title}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.length ? (
            data.map((entry, entryIndex) => (
              <TableRow
                key={entry?.id || entryIndex}
                onClick={() => onRowClick?.(entry?.id)}
                className={clsx({
                  'cursor-pointer': typeof onRowClick === 'function',
                })}
              >
                {columns.map(
                  ({ Cell, field, title, className }, columnIndex) => (
                    <TableCell key={title + columnIndex} className={className}>
                      {Cell ? (
                        <Cell entry={entry} index={entryIndex} />
                      ) : (
                        `${entry[field] ?? '-'}`
                      )}
                    </TableCell>
                  ),
                )}
              </TableRow>
            ))
          ) : (
            <TableRow className="text-center border-0">
              <TableCell colSpan={columns.length}>Không có dữ liệu</TableCell>
            </TableRow>
          )}
        </TableBody>
      </TableElement>
      {pagination && (
        <div className="flex justify-end py-8">
          <TablePagination {...pagination} />
        </div>
      )}
    </>
  );
};
