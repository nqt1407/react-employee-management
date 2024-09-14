import { useMemo } from 'react';

import { useDeepCompareMemoize } from '@/hooks/use-deep-compare-memorize';

import { Checkbox } from '../../../forms/checkbox';
import {
  TableHead as BaseTableHead,
  TableHeader as BaseTableHeader,
} from '../base/TableHead';
import { TableRow as BaseTableRow } from '../base/TableRow';

import {
  useTableRootProps,
  useTableSelectionData,
  useTableActions,
} from './TableProvider';
import { RowSelectionModel } from './types';

// ----------  Component ----------

const TableHeadCellSelection = ({
  dataLengths,
  onRowSelectionAll,
}: {
  dataLengths: number;
  onRowSelectionAll: (selectedRowIds: RowSelectionModel) => void;
}) => {
  const selectedRowIds = useTableSelectionData();
  const { onSelectAll } = useTableActions();

  const isChecked =
    selectedRowIds.length > 0 && selectedRowIds.length === dataLengths;
  const isIndeterminate =
    selectedRowIds.length > 0 && selectedRowIds.length < dataLengths;

  const handleCheckboxChange = (checked: boolean) => {
    onSelectAll(checked, onRowSelectionAll);
  };

  return (
    <BaseTableHead className="w-10">
      <Checkbox
        className="hover:cursor-pointer"
        onChange={handleCheckboxChange}
        checked={isChecked}
        indeterminate={isIndeterminate}
      />
    </BaseTableHead>
  );
};

export const TableHead = () => {
  const { data, columns, rowSelection } = useTableRootProps();
  const { hideSelectAll, onChange } = rowSelection || {};

  const stableColumns = useDeepCompareMemoize(columns);
  const onRowSelectionAll = useDeepCompareMemoize(onChange);

  const dataLength = useMemo(() => {
    return data.length;
  }, [data]);

  const headerSelectionCell = useMemo(() => {
    if (!onRowSelectionAll) return null;
    if (hideSelectAll) return <BaseTableHead />;
    return (
      <TableHeadCellSelection
        dataLengths={dataLength}
        onRowSelectionAll={onRowSelectionAll}
      />
    );
  }, [dataLength, hideSelectAll, onRowSelectionAll]);

  const children = useMemo(() => {
    return stableColumns.map((column, index) => (
      <BaseTableHead key={column.title + index}>{column.title}</BaseTableHead>
    ));
  }, [stableColumns]);

  return (
    <BaseTableHeader>
      <BaseTableRow>
        {headerSelectionCell}
        {children}
      </BaseTableRow>
    </BaseTableHeader>
  );
};
