import clsx from 'clsx';
import React from 'react';

const TableCell = React.forwardRef<
  HTMLTableCellElement,
  React.TdHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <td ref={ref} className={clsx('p-2 align-middle', className)} {...props} />
));
TableCell.displayName = 'TableCell';

export { TableCell };
