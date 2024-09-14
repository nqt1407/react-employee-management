import clsx from 'clsx';
import { useMemo } from 'react';

import { useDeepCompareMemoize } from '@/hooks/use-deep-compare-memorize';
import { fastMemo } from '@/utils/memo';

import { Checkbox } from '../../../forms/checkbox';
import { TableBody as BasedTableBody } from '../base/TableBody';
import { TableCell as BasedTableCell } from '../base/TableCell';
import { TableRow as BaseTableRow } from '../base/TableRow';
import { BaseEntity } from '../base/types';

import {
  useTableRootProps,
  useTableActions,
  useTableSelectionData,
} from './TableProvider';

type TableRowProps<Entry> = {
  rowData: Entry;
  rowIdx: number;
  checked?: boolean;
};

const TableRow = <Entry extends BaseEntity>({
  rowData,
  rowIdx,
}: TableRowProps<Entry>) => {
  const { onSelect } = useTableActions();
  const selectedRowIds = useTableSelectionData();
  const { columns, rowSelection, onRow } = useTableRootProps();

  const stableColumns = useDeepCompareMemoize(columns);

  const { onChange: onSelectionChange, getCheckBoxProps } = rowSelection || {};

  const selectionCell = () => {
    if (!onSelectionChange) return null;
    const isChecked = selectedRowIds.includes(rowData.id);
    return (
      <BasedTableCell>
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
        <BasedTableCell key={title + columnIndex} className={className}>
          {Cell ? <Cell entry={rowData} /> : `${rowData[field] ?? ''}`}
        </BasedTableCell>
      ),
    );
  }, [stableColumns, rowData]);

  return (
    <BaseTableRow
      className={clsx('w-10', {
        'cursor-pointer': typeof onRow === 'function',
      })}
      onClick={() => onRow?.(rowData, rowIdx)}
    >
      {selectionCell()}
      {children}
    </BaseTableRow>
  );
};

export const TableBody = fastMemo(() => {
  const { data, columns, hideEmptyLabel } = useTableRootProps();

  if (!data.length) {
    return (
      <BasedTableBody>
        <BaseTableRow className="text-center border-0">
          <BasedTableCell colSpan={columns.length}>
            {hideEmptyLabel ? '' : 'Không có dữ liệu'}
          </BasedTableCell>
        </BaseTableRow>
      </BasedTableBody>
    );
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
