import { isValidElement } from 'react';

import { Option } from '../select';

type FilterOptionsConfig<T> = {
  limit?: number;
  matchFrom?: 'start' | 'any';
  stringify?: (option: T) => string;
  trim?: boolean;
  ignoreCase?: boolean;
};

type FilterOptionsProps<T> = {
  inputValue: string;
  getOptionLabel: (option: T) => string;
};

const createFilterOptions = <T>(
  config: FilterOptionsConfig<T> = {},
): ((options: T[], props: FilterOptionsProps<T>) => T[]) => {
  const {
    limit,
    matchFrom = 'any',
    stringify,
    trim = false,
    ignoreCase = true,
  } = config;

  return (options, { inputValue, getOptionLabel }) => {
    let input = trim ? inputValue.trim() : inputValue;

    if (ignoreCase) {
      input = input.toLocaleLowerCase();
    }

    const filteredOptions = !input
      ? options
      : options.filter((option) => {
          const candidate = (stringify || getOptionLabel)(option).toLowerCase();
          return matchFrom === 'start'
            ? candidate.startsWith(input)
            : candidate.includes(input);
        });

    return limit ? filteredOptions.slice(0, limit) : filteredOptions;
  };
};

const handleDisplayValue = (value?: Option | Option[] | null): string => {
  const formatKey = (key: React.ReactNode) =>
    isValidElement(key) ? JSON.stringify(key) : String(key);

  if (!value) return '';
  if (Array.isArray(value)) {
    return value.map((el) => formatKey(el.key)).join(', ');
  }

  return formatKey(value.key);
};

const isOptionArray = <T>(value: T | T[]): value is T[] => Array.isArray(value);

export { createFilterOptions, handleDisplayValue, isOptionArray };
