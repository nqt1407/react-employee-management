import {
  Listbox as HeadlessUIListBox,
  ListboxProps as HeadlessUIListBoxProps,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
  Transition,
} from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/24/solid';
import clsx from 'clsx';
import { Fragment, useMemo } from 'react';

import { FieldWrapper, FieldWrapperPassThroughProps } from '../field-wrapper';
import { Option } from '../select';

type ListboxProps<T> = HeadlessUIListBoxProps<React.ElementType, T> &
  FieldWrapperPassThroughProps & {
    /**
     * Data input.
     */
    options: Option[];
    /**
     * Custom class name
     */
    className?: string;
  };

export const Listbox = <T extends string | number | string[] = string>({
  value,
  onChange,
  options,
  label,
  error,
  labelPosition,
  disabled,
  required,
  className,
}: ListboxProps<T>) => {
  const optionsMap = useMemo(() => {
    return options.reduce(
      (acc, item) => {
        acc[item.value.toString()] = item.key;
        return acc;
      },
      {} as Record<string, React.ReactNode>,
    );
  }, [options]);

  return (
    <FieldWrapper
      label={label}
      error={error}
      labelPosition={labelPosition}
      disabled={disabled}
      required={required}
    >
      <HeadlessUIListBox value={value} onChange={onChange}>
        <ListboxButton
          className={clsx(
            'relative block w-full rounded-md bg-white py-1.5 pr-8 pl-3 text-left text-sm/6',
            'focus:outline-none focus:ring-2 focus:ring-blue-500',
            'border border-gray-300',
            'data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50',
            {
              '!border-red-500 focus-visible:!ring-red-500': error,
            },
            className,
          )}
        >
          {value !== undefined && value !== null && (
            <>
              <span className="block truncate text-sm">
                {optionsMap[value.toString()]}
              </span>
              <ChevronDownIcon
                className="pointer-events-none absolute inset-y-0 top-2.5 right-2.5 size-4 text-gray-500"
                aria-hidden="true"
              />
            </>
          )}
        </ListboxButton>
        <Transition
          enter="transition ease-out duration-75"
          enterFrom="opacity-0 translate-y-1"
          enterTo="opacity-100 translate-y-0"
          leave="transition ease-in duration-75"
          leaveFrom="opacity-100 translate-y-0"
          leaveTo="opacity-0 translate-y-1"
        >
          <ListboxOptions
            anchor="bottom"
            transition
            className={clsx(
              'w-[var(--button-width)] mt-1 rounded-md border border-gray-300 bg-white shadow-lg p-1 [--anchor-gap:var(--spacing-1)] focus:outline-none',
              'focus:outline-none',
            )}
          >
            {options.map(({ key, value }) => (
              <ListboxOption
                key={`${value}-${key?.toString()}`}
                value={value}
                as={Fragment}
              >
                {({ selected }) => (
                  <div
                    className={clsx(
                      'cursor-pointer px-4 py-2 text-gray-800 hover:bg-gray-100',
                      'focus:bg-gray-200',
                      'transition-colors duration-150',
                      'text-sm',
                      { 'font-bold': selected },
                    )}
                  >
                    {key}
                  </div>
                )}
              </ListboxOption>
            ))}
          </ListboxOptions>
        </Transition>
      </HeadlessUIListBox>
    </FieldWrapper>
  );
};
