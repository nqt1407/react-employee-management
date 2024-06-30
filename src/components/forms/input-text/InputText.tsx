import { Input } from '@headlessui/react';
import clsx from 'clsx';
import React from 'react';
import { type UseFormRegisterReturn } from 'react-hook-form';

import { FieldWrapper, FieldWrapperPassThroughProps } from '../field-wrapper';

export type InputTextProps = React.InputHTMLAttributes<HTMLInputElement> &
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

export const InputText = React.forwardRef<HTMLInputElement, InputTextProps>(
  (
    {
      className,
      label,
      error,
      labelPosition,
      disabled,
      register,
      required,
      ...props
    },
    ref,
  ) => {
    return (
      <FieldWrapper
        label={label}
        error={error}
        labelPosition={labelPosition}
        disabled={disabled}
        required={required}
      >
        <Input
          ref={ref}
          className={clsx(
            'flex h-8 w-full rounded-lg border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50 data-[invalid]:border-red-500 data-[invalid]:focus-visible:ring-red-500',
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

InputText.displayName = 'InputText';
