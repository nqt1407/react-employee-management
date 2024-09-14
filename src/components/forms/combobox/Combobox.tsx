import {
  ComboboxProps as HeadlessUIComboboxProps,
  Combobox as HeadlessUICombobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxOptions,
  ComboboxOption,
  Transition,
} from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/24/solid';
import clsx from 'clsx';
import { useState, Fragment, useMemo, useCallback } from 'react';

import { FieldWrapper, FieldWrapperPassThroughProps } from '../field-wrapper';
import { Option } from '../select';

import { createFilterOptions, handleDisplayValue } from './helper';

// TODO handle multiple case
export type ComboboxProps<
  TValue,
  TMultiple extends boolean | undefined = undefined,
> = Omit<HeadlessUIComboboxProps<TValue, TMultiple>, 'multiple'> &
  Required<Pick<HeadlessUIComboboxProps<TValue, TMultiple>, 'by'>> &
  FieldWrapperPassThroughProps & {
    options: TValue[];
    className?: string;
    labelExtractor?: (item: TValue) => string;
  };

export const Combobox = <TValue extends Option | null>({
  options,
  label,
  error,
  labelPosition,
  disabled,
  required,
  labelExtractor: labelExtractorProp,
  className,
  ...props
}: ComboboxProps<TValue>) => {
  const { onChange: onChangeProp, onClose: onCloseProp } = props;

  const [query, setQuery] = useState('');

  const labelExtractor = labelExtractorProp ?? handleDisplayValue;

  const filteredOptions = useMemo(
    () =>
      createFilterOptions<TValue>({
        matchFrom: 'any',
        trim: true,
      })(options, {
        inputValue: query,
        getOptionLabel: (option) => String(option?.key),
      }),
    [query, options],
  );

  const onChange = useCallback(
    (value: TValue | null) => {
      onChangeProp?.(value);
    },
    [onChangeProp],
  );

  const onClose = useCallback(() => {
    setQuery('');
    onCloseProp?.();
  }, [onCloseProp]);

  return (
    <FieldWrapper
      label={label}
      error={error}
      labelPosition={labelPosition}
      disabled={disabled}
      required={required}
    >
      <HeadlessUICombobox<TValue>
        {...props}
        onChange={onChange}
        onClose={onClose}
      >
        <div className="relative w-full">
          <ComboboxInput<TValue>
            className={clsx(
              'relative block w-full rounded-md bg-white py-1.5 pr-8 pl-2 text-left text-sm/6 border border-gray-300',
              'focus:outline-none focus:ring-2 focus:ring-blue-500',
              'data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50',
              {
                '!border-red-500 focus-visible:!ring-red-500': error,
              },
              className,
            )}
            autoComplete="off"
            displayValue={labelExtractor}
            onChange={(event) => setQuery(event.target.value)}
          />
          <ComboboxButton className="group absolute inset-y-0 right-0 px-2.5">
            <ChevronDownIcon
              className="pointer-events-none absolute inset-y-0 top-2.5 right-2.5 size-4 text-gray-500"
              aria-hidden="true"
            />
          </ComboboxButton>
        </div>
        <Transition
          enter="transition ease-out duration-75"
          enterFrom="opacity-0 translate-y-1"
          enterTo="opacity-100 translate-y-0"
          leave="transition ease-in duration-75"
          leaveFrom="opacity-100 translate-y-0"
          leaveTo="opacity-0 translate-y-1"
          afterLeave={() => setQuery('')}
        >
          <ComboboxOptions
            anchor="bottom"
            className="w-[var(--input-width)] mt-1 rounded-md border border-gray-300 bg-white shadow-lg p-1 [--anchor-gap:var(--spacing-1)] focus:outline-none empty:invisible"
          >
            {filteredOptions.map((option) => (
              <ComboboxOption
                key={`${option?.value}-${option?.key?.toString()}`}
                value={option}
                as={Fragment}
              >
                {({ selected, focus }) => (
                  <div
                    className={clsx(
                      'cursor-pointer px-4 py-2 text-gray-800 hover:bg-gray-100 focus:bg-gray-200 transition-colors duration-150 text-sm select-none',
                      { 'font-bold': selected },
                      { 'bg-gray-200': focus },
                    )}
                  >
                    {option?.key}
                  </div>
                )}
              </ComboboxOption>
            ))}
          </ComboboxOptions>
        </Transition>
      </HeadlessUICombobox>
    </FieldWrapper>
  );
};

export type { Option };
