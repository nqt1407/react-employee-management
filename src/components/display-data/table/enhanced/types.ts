import { CheckboxProps } from '../../../forms/checkbox';
import { PaginationProps as TablePaginationProps } from '../../pagination';
import { TableColumn as BasedTableColumn } from '../base/types';

// type FilterValue = {
//   text: string;
//   value: string | number;
//   filterDropDowns?: () => React.ReactNode;
// };

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
  columns: BasedTableColumn<Entry>[];
  pagination?: TablePaginationProps;
  className?: string;
  rowSelection?: RowSelection<Entry>;
  onRow?: (rowData: Entry, rowIdx: number) => void;
  footer?: React.ReactNode;
  hideEmptyLabel?: boolean;
};

export type TableColumns<Entry> = BasedTableColumn<Entry>;
