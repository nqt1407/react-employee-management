import {
  Checkbox as HeadlessUICheckbox,
  CheckboxProps as HeadLessUICheckboxProps,
} from '@headlessui/react';
import MinusIcon from '@heroicons/react/24/solid/MinusIcon';
import clsx from 'clsx';

import { FieldWrapper, FieldWrapperPassThroughProps } from '../field-wrapper';

const sizes = {
  sm: 'size-4',
  md: 'size-6',
  lg: 'size-8',
  xl: 'size-10',
};

export type CheckboxProps = Pick<
  FieldWrapperPassThroughProps,
  'disabled' | 'required'
> &
  HeadLessUICheckboxProps & {
    className?: string;
    size?: keyof typeof sizes;
  };

export const Checkbox = ({
  disabled,
  required,
  size = 'sm',
  className,
  ...restProps
}: CheckboxProps) => {
  return (
    <FieldWrapper disabled={disabled} required={required}>
      <HeadlessUICheckbox
        {...restProps}
        className={clsx(
          'relative inline-flex items-center justify-center group rounded border border-gray-500 bg-white/10 data-[checked]:bg-blue-500 data-[disabled]:bg-gray-500',
          sizes[size],
          className,
        )}
      >
        <MinusIcon
          className={clsx(
            'hidden fill-black group-data-[checked]:hidden group-data-[indeterminate]:block',
            sizes[size],
          )}
        />
      </HeadlessUICheckbox>
    </FieldWrapper>
  );
};
