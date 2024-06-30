import { Select as HeadlessUISelect } from '@headlessui/react';
import clsx from 'clsx';
import { type UseFormRegisterReturn } from 'react-hook-form';

import { FieldWrapper, FieldWrapperPassThroughProps } from '../field-wrapper';

export type Option = {
  /**
   * Option's key. Key is display content.
   */
  key: React.ReactNode;
  /**
   * Option's value.
   */
  value: string | number | string[];
};

export type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement> &
  FieldWrapperPassThroughProps & {
    /**
     * Data input.
     */
    options: Option[];
    /**
     * The default value. Use when the component is not controlled
     */
    defaultValue?: string | number;
    /**
     * Custom class name
     */
    className?: string;
    /**
     * Register method for react-hook-form
     */
    register?: Partial<UseFormRegisterReturn>;
  };

export const Select = ({
  options,
  register,
  className,
  label,
  error,
  defaultValue,
  labelPosition,
  disabled,
  required,
  ...props
}: SelectProps) => {
  return (
    <FieldWrapper
      label={label}
      error={error}
      labelPosition={labelPosition}
      disabled={disabled}
      required={required}
    >
      <HeadlessUISelect
        defaultValue={defaultValue}
        className={clsx(
          'mt-1 block w-full rounded-lg border text-gray-900 border-gray-200 p-2.5 text-base focus:border-blue-500 focus:ring-blue-500 focus:outline-none sm:text-sm data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50 data-[invalid]:border-red-500 data-[invalid]:focus-visible:ring-red-500',
          className,
        )}
        invalid={!!error}
        {...register}
        {...props}
      >
        {options.map(({ key, value }) => (
          <option key={`${value}-${key?.toString()}`} value={value}>
            {key}
          </option>
        ))}
      </HeadlessUISelect>
    </FieldWrapper>
  );
};
