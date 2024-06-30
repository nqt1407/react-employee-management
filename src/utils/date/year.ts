import { Option } from '@/components/forms/select';

export const generateYearOptions = (
  startYear: number,
  endYear: number,
): Option[] => {
  return Array.from({ length: endYear - startYear + 1 }, (_, i) => {
    const year = startYear + i;
    return { key: year, value: year };
  });
};
