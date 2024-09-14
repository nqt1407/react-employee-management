import clsx from 'clsx';
import React from 'react';

const TableRow = React.forwardRef<
  HTMLTableRowElement,
  React.HTMLAttributes<HTMLTableRowElement>
>(({ className, ...props }, ref) => (
  <tr
    ref={ref}
    className={clsx('border-b transition-colors hover:bg-muted/50', className)}
    {...props}
  />
));
TableRow.displayName = 'TableRow';

export { TableRow };
