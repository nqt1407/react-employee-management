import clsx from 'clsx';
import React from 'react';

const TableElement = React.forwardRef<
  HTMLTableElement,
  React.HTMLAttributes<HTMLTableElement>
>(({ className, ...props }, ref) => (
  <div className="relative w-full overflow-auto">
    <table
      ref={ref}
      className={clsx(
        'w-full caption-bottom text-sm border-collapse',
        className,
      )}
      {...props}
    />
  </div>
));
TableElement.displayName = 'Table';

export { TableElement };
