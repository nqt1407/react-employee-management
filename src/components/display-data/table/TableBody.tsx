import clsx from 'clsx';
import { useMemo } from 'react';

import { useDeepCompareMemoize } from '@/hooks/use-deep-compare-memorize';
import { fastMemo } from '@/utils/memo';

import { Checkbox } from '../../forms/checkbox';

import { TableBody as BasedTableBody } from './parts/TableBody';
import { TableCell as BasedTableCell } from './parts/TableCell';
import { TableRow as BaseTableRow } from './parts/TableRow';
import { useVirtual } from './providers/ScrollProvider';
import {
  useTableRootProps,
  useTableActions,
  useTableData,
} from './providers/TableProvider';
import { BaseEntity } from './types';

type TableCellProps = {
  className?: string;
  field: string;
  children: React.ReactNode;
};

const TableCell = ({ children, className, field }: TableCellProps) => {
  const { virtual } = useTableRootProps();
  const { colsWidth } = useTableData();

  const cellAttr: React.HTMLAttributes<HTMLElement> = {
    className,
  };

  if (virtual) {
    cellAttr.style = {
      width: colsWidth.get(field) ? `${colsWidth.get(field)}px` : 'auto',
      flex: `0 0 ${colsWidth.get(field)}px`,
      overflow: 'hidden', // Prevents overflow of content
      textOverflow: 'ellipsis', // Adds ellipsis if content is too long
      whiteSpace: 'nowrap', // Prevents content wrapping
      wordBreak: 'break-all', // Breaks words if necessary
    };
  }

  return <BasedTableCell {...cellAttr}>{children}</BasedTableCell>;
};

type TableRowProps<Entry> = {
  rowData: Entry;
  rowIdx: number;
  checked?: boolean;
  style?: React.CSSProperties;
};

const TableRow = <Entry extends BaseEntity>({
  rowData,
  rowIdx,
  style,
}: TableRowProps<Entry>) => {
  const { onSelect } = useTableActions();
  const { rowsSelection } = useTableData();
  const { columns, rowSelection, onRow } = useTableRootProps();

  const stableColumns = useDeepCompareMemoize(columns);

  const { onChange: onSelectionChange, getCheckBoxProps } = rowSelection || {};

  const selectionCell = () => {
    if (!onSelectionChange) return null;
    const isChecked = rowsSelection.includes(rowData.id);
    return (
      <BasedTableCell className="w-10">
        <Checkbox
          {...(getCheckBoxProps?.(rowData) || {})}
          checked={isChecked}
          onClick={(e) => e.stopPropagation()}
          onChange={(checked) => {
            onSelect(checked, rowData.id, onSelectionChange);
          }}
        />
      </BasedTableCell>
    );
  };

  const children = useMemo(() => {
    return stableColumns.map(
      ({ Cell, field, title, className }, columnIndex) => (
        <TableCell
          key={title + columnIndex}
          field={field}
          className={className}
        >
          {Cell ? <Cell entry={rowData} /> : `${rowData[field] ?? ''}`}
        </TableCell>
      ),
    );
  }, [stableColumns, rowData]);

  return (
    <BaseTableRow
      className={clsx({
        'cursor-pointer': typeof onRow === 'function',
      })}
      style={style}
      {...onRow?.(rowData, rowIdx)}
    >
      {selectionCell()}
      {children}
    </BaseTableRow>
  );
};

const EmptyTableBody = () => {
  const { columns, hideEmptyLabel, rowSelection } = useTableRootProps();

  const colSpan = rowSelection ? columns.length + 1 : columns.length;

  return (
    <BasedTableBody>
      <BaseTableRow className="text-center border-0">
        <BasedTableCell colSpan={colSpan}>
          {hideEmptyLabel ? '' : 'Không có dữ liệu'}
        </BasedTableCell>
      </BaseTableRow>
    </BasedTableBody>
  );
};

export const TableBody = fastMemo(() => {
  const { data } = useTableRootProps();

  if (!data.length) {
    return <EmptyTableBody />;
  }

  return (
    <BasedTableBody>
      {data.map((entry, entryIndex) => (
        <TableRow
          key={entry?.id || entryIndex}
          rowData={entry}
          rowIdx={entryIndex}
        />
      ))}
    </BasedTableBody>
  );
});

export const VirtualTableBody = () => {
  const { data } = useTableRootProps();
  const { getVirtualData, getTotalSize } = useVirtual();

  if (!data.length) {
    return <EmptyTableBody />;
  }

  const virtualData = getVirtualData() ?? [];
  return (
    <BasedTableBody
      style={{
        height: `${getTotalSize()}px`,
        width: '100%',
        position: 'relative',
      }}
    >
      {virtualData.map((virtualRow) => {
        const entry = data[virtualRow.index];
        return (
          <TableRow
            key={entry?.id || virtualRow.index}
            rowData={entry}
            rowIdx={virtualRow.index}
            style={{
              top: 0,
              left: 0,
              position: 'absolute',
              height: `${virtualRow.size}px`,
              transform: `translateY(${virtualRow.start}px)`,
              display: 'flex',
              width: '100%',
            }}
          />
        );
      })}
    </BasedTableBody>
  );
};
