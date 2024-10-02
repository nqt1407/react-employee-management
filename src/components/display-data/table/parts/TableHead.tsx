import clsx from 'clsx';
import React from 'react';

const TableHeader = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <thead ref={ref} className={clsx('[&_tr]:border-b', className)} {...props} />
));
TableHeader.displayName = 'TableHeader';

const TableHead = React.forwardRef<
  HTMLTableCellElement,
  React.ThHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <th
    ref={ref}
    className={clsx(
      'h-10 px-2 text-left align-middle font-bold bg-gray-200/50',
      className,
    )}
    {...props}
  />
));
TableHead.displayName = 'TableHead';

export { TableHead, TableHeader };
