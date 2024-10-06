import { Pagination as TablePagination } from '../pagination';

import { TableElement } from './parts/TableElement';
import {
  LoadingProvider,
  ScrollProvider,
  TableDataProvider,
} from './providers';
import { TableBody, VirtualTableBody } from './TableBody';
import { TableHead } from './TableHead';
import { BaseEntity, TableProps } from './types';

export const Table = <Entry extends BaseEntity>(props: TableProps<Entry>) => {
  const { pagination, footer, virtual } = props;

  const tableElement = virtual ? <VirtualTable /> : <InternalTable />;

  return (
    <TableDataProvider tableProps={props}>
      <LoadingProvider loading={props.loading}>
        <ScrollProvider>
          {tableElement}
          {footer && <div className="border-t font-medium">{footer}</div>}
          {pagination && (
            <div className="flex justify-end py-8">
              <TablePagination {...pagination} />
            </div>
          )}
        </ScrollProvider>
      </LoadingProvider>
    </TableDataProvider>
  );
};

const InternalTable = () => {
  return (
    <>
      <TableElement>
        <TableHead />
        <TableBody />
      </TableElement>
    </>
  );
};

const VirtualTable = () => {
  return (
    <>
      <TableElement className="table-fixed w-full">
        <TableHead />
        <VirtualTableBody />
      </TableElement>
    </>
  );
};
