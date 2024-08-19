import {
  Popover,
  PopoverButton,
  PopoverPanel,
  PopoverPanelProps,
  PopoverOverlay,
  PopoverGroup,
  CloseButton,
  Transition,
} from '@headlessui/react';
import { clsx } from 'clsx';
import React from 'react';

const PopoverContent = React.forwardRef<
  React.ElementRef<typeof PopoverPanel>,
  PopoverPanelProps
>(({ className, children, ...props }, ref) => {
  return (
    <Transition
      enter="transition ease-out duration-200"
      enterFrom="opacity-0 translate-y-1"
      enterTo="opacity-100 translate-y-0"
      leave="transition ease-in duration-150"
      leaveFrom="opacity-100 translate-y-0"
      leaveTo="opacity-0 translate-y-1"
    >
      <PopoverPanel
        ref={ref}
        className={clsx(
          'p-3 divide-y rounded-xl [--anchor-gap:var(--spacing-5)]',
          className,
        )}
        {...props}
      >
        {children}
      </PopoverPanel>
    </Transition>
  );
});

PopoverContent.displayName = 'PopOverContent';

export {
  Popover,
  PopoverButton,
  PopoverContent,
  CloseButton as PopoverCloseButton,
  PopoverOverlay,
  PopoverGroup,
};
