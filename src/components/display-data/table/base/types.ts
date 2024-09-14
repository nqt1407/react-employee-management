import { PaginationProps as TablePaginationProps } from '../../pagination';

export type BaseEntity = {
  id: string | number;
};

export type TableColumn<Entry> = {
  title: string;
  field: keyof Entry;
  className?: string;
  Cell?({ entry, index }: { entry: Entry; index?: number }): React.ReactElement;
};

export type TableProps<Entry> = {
  data: Entry[];
  columns: TableColumn<Entry>[];
  className?: string;
  pagination?: TablePaginationProps;
  onRowClick?: (selectedRowId: string | number) => void;
};
