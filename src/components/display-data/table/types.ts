import { CheckboxProps } from '../../forms/checkbox';
import { PaginationProps as TablePaginationProps } from '../pagination';

export type BaseEntity = {
  id: string | number;
};

export type FilterValue = {
  /**
   * Text is display content.
   */
  text: string;
  /**
   * Value is unique. Use for callback
   */
  value: string | number;
};

export type FilterConfirmProps = {
  closeDropdown: boolean;
};

export type FilterDropdownProps = {
  setSelectedKeys: (selectedKeys: React.Key[]) => void;
  selectedKeys: React.Key[];
  filters?: FilterValue[];
  clearFilters?: () => void;
  confirm: (param?: FilterConfirmProps) => void;
  close: () => void;
};

export type SortOrder = 'descend' | 'ascend' | null;

export type RowSelectionId = string | number;

export type RowSelectionModel = Array<RowSelectionId>;

export type RowSelection<Entry> = {
  type: 'checkbox' | 'radio';
  selectedRowIds: RowSelectionModel;
  hideSelectAll?: boolean;
  onChange: (selectedRowIds: RowSelectionModel) => void;
  getCheckBoxProps?: (
    record: Entry,
  ) => Partial<Omit<CheckboxProps, 'checked' | 'defaultChecked'>>;
};

export type TableProps<Entry> = {
  data: Entry[];
  columns: TableColumn<Entry>[];
  pagination?: TablePaginationProps;
  className?: string;
  rowSelection?: RowSelection<Entry>;
  onRow?: (
    rowData: Entry,
    rowIdx: number,
  ) => React.HTMLAttributes<any> & React.TdHTMLAttributes<any>;
  footer?: React.ReactNode;
  hideEmptyLabel?: boolean;
  loading?: boolean;
};

export type TableColumn<Entry> = {
  title: string;
  field: keyof Entry;
  className?: string;
  Cell?({ entry, index }: { entry: Entry; index?: number }): React.ReactElement;
  // Filter props
  filters?: FilterValue[];
  filterDropdown?:
    | React.ReactNode
    | ((props: FilterDropdownProps) => React.ReactNode);
  onFilter?: (key: keyof Entry, value: (React.Key | boolean)[] | null) => void;
  filterIcon?: (filtered: boolean) => React.ReactNode;
  filterSearch?: boolean;
  filterMultiple?: boolean;
  filteredValue?: string[] | number[] | null;
  // Sort props
  sortDirection?: SortOrder;
  onSort?: (key: keyof Entry, value: SortOrder) => void;
  showSorterTooltip?: boolean;
};
