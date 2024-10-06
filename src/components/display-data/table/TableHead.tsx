import {
  FunnelIcon,
  ChevronUpIcon,
  ChevronDownIcon,
} from '@heroicons/react/24/solid';
import clsx from 'clsx';
import { useMemo, useState, useRef, useLayoutEffect } from 'react';

import { Button } from '@/components/forms/button';
import { useDeepCompareMemoize } from '@/hooks/use-deep-compare-memorize';

import { Checkbox } from '../../forms/checkbox';
import { InputText } from '../../forms/input-text';
import { Popover, PopoverButton, PopoverContent } from '../../overlay/popover';
import { Tooltip } from '../../overlay/tooltip';

import {
  TableHead as BaseTableHead,
  TableHeader as BaseTableHeader,
} from './parts/TableHead';
import { TableRow as BaseTableRow } from './parts/TableRow';
import {
  useTableRootProps,
  useTableData,
  useTableActions,
} from './providers/TableProvider';
import {
  BaseEntity,
  RowSelectionModel,
  TableColumn,
  SortOrder,
  FilterValue,
} from './types';

// ----------  Utils ----------

const nextSortDirection = (current: SortOrder | null) => {
  const DEFAULT_SORT_DIRECTIONS: SortOrder[] = ['descend', 'ascend'];
  if (!current) {
    return DEFAULT_SORT_DIRECTIONS[0];
  }

  return DEFAULT_SORT_DIRECTIONS[DEFAULT_SORT_DIRECTIONS.indexOf(current) + 1];
};

const renderFilterItem = (searchValue: string, filters: FilterValue[]) => {
  return filters.filter((filter) => {
    return filter.text
      ?.toString()
      .toLowerCase()
      .includes(searchValue.trim().toLowerCase());
  });
};

// ----------  Components ----------

type FilterSearchProps = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  filterSearch?: boolean;
};

const FilterSearch = ({ value, onChange, filterSearch }: FilterSearchProps) => {
  if (!filterSearch) {
    return null;
  }

  return (
    <div className="w-full py-1 border-b-1 border-slate-100">
      <InputText value={value} onChange={onChange} />
    </div>
  );
};

type FilterItemsProps = {
  items: FilterValue[];
  selectedKeys: (string | number)[];
  onSelect: (value: (string | number)[]) => void;
  multiple?: boolean;
};

const FilterItems = ({
  items,
  selectedKeys,
  multiple = true,
  onSelect: onSelectProp,
}: FilterItemsProps) => {
  const onSelect = (checked: boolean, filterValue: string | number) => {
    let newSelection: (string | number)[];

    if (multiple) {
      newSelection = checked
        ? [...selectedKeys, filterValue]
        : selectedKeys.filter((id) => id !== filterValue);
    } else {
      newSelection = checked ? [filterValue] : [];
    }

    onSelectProp(newSelection);
  };

  if (!items.length)
    return (
      <div className="border-none text-sm text-center text-gray-400">
        Không có dữ liệu
      </div>
    );

  return items.map(({ value, text }) => (
    <div key={value} className="flex space-x-1 p-1 border-none content-center">
      <div className="w-6">
        <Checkbox
          onClick={(e) => e.stopPropagation()}
          checked={selectedKeys.includes(value)}
          onChange={(checked) => onSelect(checked, value)}
        />
      </div>
      <span className="text-sm">{text}</span>
    </div>
  ));
};

type FilterDropDownProps<Entry> = Pick<
  TableColumn<Entry>,
  | 'filters'
  | 'filterDropdown'
  | 'onFilter'
  | 'filterIcon'
  | 'filterSearch'
  | 'filterMultiple'
  | 'filteredValue'
> & { columnKey: keyof Entry };

const FilterDropDown = <Entry extends BaseEntity>({
  columnKey,
  filters,
  filterSearch,
  filterDropdown,
  filterMultiple,
  filteredValue,
  onFilter: onFilterChangeProp,
  filterIcon: filterIconProp,
}: FilterDropDownProps<Entry>) => {
  const [searchValue, setSearchValue] = useState<string>('');
  const [selectedValues, setSelectedValues] = useState<(string | number)[]>(
    filteredValue ?? [],
  );

  const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearchValue(value);
  };

  const onFilterChange = (filterValue: (string | number)[]) => {
    setSelectedValues(filterValue);
  };

  const onConfirmFilter = (onCloseDialog?: () => void) => {
    if (onFilterChangeProp) {
      onFilterChangeProp(columnKey, selectedValues);
    }

    onCloseDialog?.();
  };

  const onResetFilter = () => {
    if (filterSearch) setSearchValue('');
    setSelectedValues([]);
  };

  const filterItems = useMemo(
    () => renderFilterItem(searchValue, filters ?? []),
    [searchValue, filters],
  );

  const filterIcon: React.ReactNode = useMemo(() => {
    const filterValues = selectedValues.filter((val) => Boolean(val));

    if (typeof filterIconProp === 'function') {
      return filterIconProp(filterValues.length > 0);
    }

    return (
      <FunnelIcon
        className={clsx(
          'size-3',
          filterValues.length > 0 ? 'text-blue-500' : 'text-gray-400',
        )}
      />
    );
  }, [filterIconProp, selectedValues]);

  const dropdownContent = (onCloseDialog: () => void) => {
    if (typeof filterDropdown === 'function') {
      return filterDropdown({
        selectedKeys: selectedValues,
        setSelectedKeys: (selectedKeys) =>
          onFilterChange(selectedKeys as string[]),
        clearFilters: onResetFilter,
        confirm: (param) =>
          onConfirmFilter(param?.closeDropdown ? onCloseDialog : undefined),
        close: () => onCloseDialog(),
      });
    }

    if (filterDropdown) return filterDropdown;

    return (
      <>
        <FilterSearch
          value={searchValue}
          onChange={onSearch}
          filterSearch={filterSearch}
        />
        <FilterItems
          items={filterItems}
          selectedKeys={selectedValues}
          onSelect={(value) => onFilterChange(value)}
          multiple={filterMultiple}
        />
        <div className="flex flex-row justify-between pt-2">
          <Button size="xs" variant="text" onClick={onResetFilter}>
            Reset
          </Button>
          <Button size="xs" onClick={() => onConfirmFilter(onCloseDialog)}>
            OK
          </Button>
        </div>
      </>
    );
  };

  return (
    <Popover onClick={(e) => e.stopPropagation()}>
      {({ close }) => (
        <>
          <PopoverButton className="bg-inherit p-1 rounded-lg hover:shadow-lg hover:bg-slate-400/40 focus:outline-none">
            {filterIcon}
          </PopoverButton>
          <PopoverContent
            anchor={{ to: 'bottom', gap: '4px', offset: '16px' }}
            className="w-fit px-1 space-y-2 flex flex-col bg-white shadow-xl"
          >
            {dropdownContent(close)}
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
    sortDirection,
    showSorterTooltip = true,
    onSort,
  } = props;
  const cellRef = useRef<HTMLTableCellElement>(null);
  const { onColumnsResize } = useTableActions();

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

    headerAttr.className = clsx(headerAttr.className, 'hover:bg-gray-300');

    if (showSorterTooltip && sortTip) {
      children = (
        <Tooltip label={sortTip} colorScheme="black" hasArrow>
          {children}
        </Tooltip>
      );
    }
  }

  // * Handle filter props
  if (filters || 'filterDropdown' in props || 'onFilter' in props) {
    children = (
      <div className="flex justify-between items-center">
        {children}
        <FilterDropDown columnKey={field} filters={filters} {...props} />
      </div>
    );
  }

  useLayoutEffect(() => {
    const updateWidth = () => {
      if (cellRef.current) {
        onColumnsResize(field as string, cellRef.current.offsetWidth);
      }
    };

    updateWidth();
    window.addEventListener('resize', updateWidth);

    return () => {
      window.removeEventListener('resize', updateWidth);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <BaseTableHead ref={cellRef} {...headerAttr}>
      {children}
    </BaseTableHead>
  );
};

const TableHeadCellSelection = ({
  dataLengths,
  onRowSelectionAll,
}: {
  dataLengths: number;
  onRowSelectionAll: (selectedRowIds: RowSelectionModel) => void;
}) => {
  const { rowsSelection } = useTableData();

  const { onSelectAll } = useTableActions();

  const isChecked =
    rowsSelection.length > 0 && rowsSelection.length === dataLengths;
  const isIndeterminate =
    rowsSelection.length > 0 && rowsSelection.length < dataLengths;

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
  const { data, columns, rowSelection, scroll } = useTableRootProps();
  const { hideSelectAll, onChange: onRowSelectionAll } = rowSelection || {};

  const stableColumns = useDeepCompareMemoize(columns);

  const stickyHeader = !!scroll;

  const dataLength = useMemo(() => {
    return data.length;
  }, [data]);

  const renderSelectionCell = () => {
    if (!onRowSelectionAll) return null;
    if (hideSelectAll) return <BaseTableHead />;
    return (
      <TableHeadCellSelection
        dataLengths={dataLength}
        onRowSelectionAll={onRowSelectionAll}
      />
    );
  };

  const children = useMemo(() => {
    return stableColumns.map((column, index) => (
      <TableHeadCell key={column.title + index} {...column} />
    ));
  }, [stableColumns]);

  return (
    <BaseTableHeader>
      <BaseTableRow className={clsx({ 'sticky top-0 z-[1]': !!stickyHeader })}>
        {renderSelectionCell()}
        {children}
      </BaseTableRow>
    </BaseTableHeader>
  );
};
