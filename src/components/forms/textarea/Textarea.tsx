import { Textarea as HeadlessUITextarea } from '@headlessui/react';
import clsx from 'clsx';
import React from 'react';
import { type UseFormRegisterReturn } from 'react-hook-form';

import { FieldWrapper, FieldWrapperPassThroughProps } from '../field-wrapper';

export type TextAreaProps = React.InputHTMLAttributes<HTMLTextAreaElement> &
  FieldWrapperPassThroughProps & {
    /**
     * Custom class name
     */
    className?: string;
    /**
     * Register method for react-hook-form.
     */
    register?: Partial<UseFormRegisterReturn>;
  };

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  (
    { className, label, error, labelPosition, disabled, register, ...props },
    ref,
  ) => {
    return (
      <FieldWrapper
        label={label}
        error={error}
        labelPosition={labelPosition}
        disabled={disabled}
      >
        <HeadlessUITextarea
          ref={ref}
          className={clsx(
            'flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50 data-[invalid]:border-red-500 data-[invalid]:focus-visible:ring-red-500',
            className,
          )}
          invalid={!!error}
          {...register}
          {...props}
        />
      </FieldWrapper>
    );
  },
);

Textarea.displayName = 'Textarea';
