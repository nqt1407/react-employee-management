import { Pagination as TablePagination } from '../../pagination';
import { TableElement } from '../parts/TableElement';

import { TableBody as EnhancedTableBody } from './TableBody';
import { TableHead as EnhancedTableHead } from './TableHead';
import { TableDataProvider } from './TableProvider';
import { BaseEntity, TableProps } from './types';

export const Table = <Entry extends BaseEntity>(props: TableProps<Entry>) => {
  const { pagination, className, footer } = props;
  return (
    <TableDataProvider tableProps={props}>
      <TableElement className={className}>
        <EnhancedTableHead />
        <EnhancedTableBody />
      </TableElement>
      {footer && <div className="border-t font-medium">{footer}</div>}
      {pagination && (
        <div className="flex justify-end py-8">
          <TablePagination {...pagination} />
        </div>
      )}
    </TableDataProvider>
  );
};
