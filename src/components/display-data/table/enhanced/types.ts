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
  filters?: FilterValue[];
  filterDropDowns?: () => React.ReactNode;
  onFilter?: (value: React.Key | boolean) => void;
  filterIcon?: (filtered: boolean) => React.ReactNode;
};
