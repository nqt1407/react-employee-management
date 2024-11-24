import { Label, Field } from '@headlessui/react';
import { clsx } from 'clsx';

export type FieldWrapperProps = {
  /**
   * Label for the field
   */
  label?: string | React.ReactNode;
  /**
   * Content of the field
   */
  children: React.ReactNode;
  /**
   * Position of the label ('top' or 'left')
   */
  labelPosition?: 'top' | 'left';
  /**
   * Error message for the field
   */
  error?: string;
  /**
   * Additional class name for styling
   */
  className?: string;
  /**
   * Whether the field is required
   */
  required?: boolean;
  /**
   * Whether the field is disabled
   */
  disabled?: boolean;
};

export type FieldWrapperPassThroughProps = Omit<
  FieldWrapperProps,
  'className' | 'children'
>;

export const FieldWrapper = ({
  label,
  children,
  error,
  className,
  required,
  disabled,
  labelPosition = 'top',
  ...props
}: FieldWrapperProps) => {
  return (
    <Field
      className={clsx('flex w-full data-[disabled]:opacity-50', {
        'flex-col': labelPosition === 'top',
        'flex-row items-start': labelPosition === 'left',
      })}
      disabled={disabled}
    >
      <Label
        {...props}
        className={clsx('flex text-sm', className, {
          'mr-4': labelPosition === 'left',
          'text-red-500': !!error,
        })}
      >
        {label}
        {required && <span className="text-red-500">*</span>}
      </Label>
      <div className="w-full">
        <div>{children}</div>
        {error && (
          <div
            role="alert"
            aria-label={error}
            className="text-sm font-semibold text-red-500"
          >
            {error}
          </div>
        )}
      </div>
    </Field>
  );
};
