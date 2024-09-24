import {
  FunnelIcon,
  ChevronUpIcon,
  ChevronDownIcon,
} from '@heroicons/react/24/solid';
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
import { Tooltip } from '../../../overlay/tooltip';
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
import {
  RowSelectionModel,
  TableColumn,
  FilterValue,
  SortOrder,
} from './types';

// ----------  Components ----------

const nextSortDirection = (current: SortOrder | null) => {
  const DEFAULT_SORT_DIRECTIONS: SortOrder[] = ['descend', 'ascend'];
  if (!current) {
    return DEFAULT_SORT_DIRECTIONS[0];
  }

  return DEFAULT_SORT_DIRECTIONS[DEFAULT_SORT_DIRECTIONS.indexOf(current) + 1];
};

type FilterDropDownProps<Entry> = {
  columnKey: keyof Entry;
  filters: FilterValue[];
  onFilterChange?: (key: keyof Entry, value: (React.Key | boolean)[]) => void;
};

const FilterDropDown = <Entry extends BaseEntity>({
  columnKey,
  filters,
  onFilterChange: onFilterChangeProp,
}: FilterDropDownProps<Entry>) => {
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

  const onSubmitFilter = useCallback(
    (onCloseDialog: () => void) => {
      if (onFilterChangeProp) {
        onFilterChangeProp(columnKey, selectedValue);
      }

      onCloseDialog();
    },
    [columnKey, selectedValue, onFilterChangeProp],
  );

  const onResetFilter = useCallback(() => {
    setSelectedValue([]);
  }, []);

  return (
    <Popover onClick={(e) => e.stopPropagation()}>
      {({ close }) => (
        <>
          <PopoverButton className="bg-inherit p-1 rounded-lg hover:shadow-lg hover:bg-slate-400/40 focus:outline-none">
            <FunnelIcon
              className={clsx(
                'size-3',
                selectedValue.length > 0 ? 'text-blue-500' : 'text-gray-400',
              )}
            />
          </PopoverButton>
          <PopoverContent
            anchor={{ to: 'bottom', gap: '4px', offset: '16px' }}
            className="w-fit px-1 flex flex-col bg-white border border-slate-100 shadow-xl z-50"
          >
            {filters.map((filter) => (
              <div
                key={filter.value}
                className="flex space-x-1 p-1 border-none content-center"
              >
                <div className="w-6">
                  <Checkbox
                    onClick={(e) => e.stopPropagation()}
                    checked={selectedValue.includes(filter.value)}
                    onChange={(checked) =>
                      onFilterChange(checked, filter.value)
                    }
                  />
                </div>
                <span className="text-sm">{filter.text}</span>
              </div>
            ))}
            <div className="flex flex-row justify-between p-2">
              <Button size="xs" variant="text" onClick={onResetFilter}>
                Reset
              </Button>
              <Button size="xs" onClick={() => onSubmitFilter(close)}>
                OK
              </Button>
            </div>
          </PopoverContent>
        </>
      )}
    </Popover>
  );
};

const TableHeadCell = <Entry extends BaseEntity>(props: TableColumn<Entry>) => {
  const {
    className,
    title,
    field,
    filters,
    onFilter,
    sortDirection,
    showSorterTooltip = true,
    onSort,
  } = props;

  let children: React.ReactNode = <span>{title}</span>;
  const headerAttr: React.HTMLAttributes<HTMLElement> = {
    className,
  };

  // * Handle sort props
  if (onSort) {
    children = (
      <span className="flex justify-between items-center w-full">
        {children}
        <span aria-hidden="true">
          <ChevronUpIcon
            className={clsx('size-3', {
              'text-blue-500': sortDirection === 'ascend',
            })}
          />
          <ChevronDownIcon
            className={clsx('size-3', {
              'text-blue-500': sortDirection === 'descend',
            })}
          />
        </span>
      </span>
    );

    const sortOrder = sortDirection ? sortDirection : null;
    const nextSortOrder = nextSortDirection(sortOrder);

    let sortTip: string | undefined = 'Nhấn để huỷ sắp xếp';
    if (nextSortOrder === 'ascend') {
      sortTip = 'Nhấn để sắp xếp tăng dần';
    } else if (nextSortOrder === 'descend') {
      sortTip = 'Nhấn để sắp xếp giảm dần';
    }

    const originOnClick = headerAttr.onClick;
    headerAttr.onClick = (e) => {
      onSort(field, nextSortOrder);
      originOnClick?.(e);
    };

    headerAttr.className = clsx(headerAttr.className, 'hover:bg-gray-300/50');

    if (showSorterTooltip && sortTip) {
      children = (
        <Tooltip label={sortTip} hasArrow>
          {children}
        </Tooltip>
      );
    }
  }

  // * Handle filter props
  if (filters) {
    children = (
      <div className="flex justify-between items-center">
        {children}
        <FilterDropDown
          columnKey={field}
          filters={filters}
          onFilterChange={onFilter}
        />
      </div>
    );
  }

  return <BaseTableHead {...headerAttr}>{children}</BaseTableHead>;
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
