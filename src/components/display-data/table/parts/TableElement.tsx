import clsx from 'clsx';
import React from 'react';

const TableElement = React.forwardRef<
  HTMLTableElement,
  React.HTMLAttributes<HTMLTableElement>
>(({ className, ...props }, ref) => (
  <table
    ref={ref}
    className={clsx('w-full caption-bottom text-sm border-collapse', className)}
    {...props}
  />
));

TableElement.displayName = 'TableElement';

export { TableElement };
