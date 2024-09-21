import { FunnelIcon } from '@heroicons/react/24/solid';
import clsx from 'clsx';
import { useCallback, useMemo, useState } from 'react';

import { Button } from '@/components/forms/button';
import { useDeepCompareMemoize } from '@/hooks/use-deep-compare-memorize';

import { Checkbox } from '../../../forms/checkbox';
import {
  Popover,
  PopoverButton,
  PopoverContent,
} from '../../../overlay/popover';
import {
  TableHead as BaseTableHead,
  TableHeader as BaseTableHeader,
} from '../base/TableHead';
import { TableRow as BaseTableRow } from '../base/TableRow';
import { BaseEntity } from '../base/types';

import {
  useTableRootProps,
  useTableSelectionData,
  useTableActions,
} from './TableProvider';
import { RowSelectionModel, TableColumn, FilterValue } from './types';

// ----------  Components ----------

type FilterDropDownProps = {
  columnKey: string;
  filters: FilterValue[];
};

const FilterDropDown = ({ filters }: FilterDropDownProps) => {
  const [selectedValue, setSelectedValue] = useState<(string | number)[]>([]);

  const onFilterChange = useCallback(
    (checked: boolean, filterValue: string | number) => {
      setSelectedValue((prevState) => {
        const newSelection = checked
          ? [...prevState, filterValue]
          : prevState.filter((id) => id !== filterValue);

        return newSelection;
      });
    },
    [],
  );

  const onSubmitFilter = useCallback(() => {
    console.log(selectedValue);
  }, [selectedValue]);

  const onResetFilter = useCallback(() => {
    setSelectedValue([]);
  }, []);

  return (
    <Popover>
      <PopoverButton className="bg-inherit rounded-lg hover:shadow-lg hover:bg-slate-400/40 p-1">
        <FunnelIcon
          className={clsx(
            'size-3',
            selectedValue.length > 0 ? 'text-blue-500' : 'text-gray-400',
          )}
        />
      </PopoverButton>
      <PopoverContent
        anchor={{ to: 'bottom', gap: '4px', offset: '16px' }}
        className="w-40 px-1 flex flex-col bg-white border border-slate-100 shadow-xl z-50 md:z-0"
      >
        <div>
          {filters.map((filter) => (
            <div key={filter.value} className="flex items-center p-1">
              <div className="w-1/3">
                <Checkbox
                  checked={selectedValue.includes(filter.value)}
                  onChange={(checked) => onFilterChange(checked, filter.value)}
                />
              </div>
              <span className="w-2/3 text-sm">{filter.text}</span>
            </div>
          ))}
        </div>
        <div className="flex flex-row justify-between p-2">
          <Button size="xs" variant="text" onClick={onResetFilter}>
            Reset
          </Button>
          <Button size="xs" onClick={onSubmitFilter}>
            OK
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

const TableHeadCell = <Entry extends BaseEntity>(props: TableColumn<Entry>) => {
  const { title, filters } = props;

  let children: React.ReactNode = title;

  if (filters) {
    children = (
      <div className="flex justify-between items-center">
        <span>{children}</span>
        <FilterDropDown columnKey={title} filters={filters} />
      </div>
    );
  }

  return <BaseTableHead>{children}</BaseTableHead>;
};

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
      <TableHeadCell key={column.title + index} {...column} />
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
