import { CheckboxProps } from '../../../forms/checkbox';
import { PaginationProps as TablePaginationProps } from '../../pagination';
import { TableColumn as BasedTableColumn } from '../base/types';

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

type SortOrder = 'descend' | 'ascend';

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
  onRow?: (rowData: Entry, rowIdx: number) => void;
  footer?: React.ReactNode;
  hideEmptyLabel?: boolean;
};

export type TableColumn<Entry> = BasedTableColumn<Entry> & {
  // Filter
  filters?: FilterValue[];
  filterDropDowns?: () => React.ReactNode;
  onFilter?: (key: keyof Entry, value: (React.Key | boolean)[] | null) => void;
  filterIcon?: (filtered: boolean) => React.ReactNode;
  // Sort
  sortDirection?: SortOrder;
  onSort?: (key: keyof Entry, value: SortOrder) => void;
  showSorterTooltip?: boolean;
};
