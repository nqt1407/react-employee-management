import { Option } from '@/components/forms/select';

import { generateYearOptions } from '../year';

describe('year utils', () => {
  test('should generate year options between startYear and endYear inclusive', () => {
    const startYear = 2020;
    const endYear = 2023;
    const expectedOptions: Option[] = [
      { key: 2020, value: 2020 },
      { key: 2021, value: 2021 },
      { key: 2022, value: 2022 },
      { key: 2023, value: 2023 },
    ];

    const result = generateYearOptions(startYear, endYear);
    expect(result).toEqual(expectedOptions);
  });

  test('should return an empty array if startYear is greater than endYear', () => {
    const startYear = 2023;
    const endYear = 2020;
    const expectedOptions: Option[] = [];

    const result = generateYearOptions(startYear, endYear);
    expect(result).toEqual(expectedOptions);
  });

  test('should return a single option if startYear is equal to endYear', () => {
    const startYear = 2023;
    const endYear = 2023;
    const expectedOptions: Option[] = [{ key: 2023, value: 2023 }];

    const result = generateYearOptions(startYear, endYear);
    expect(result).toEqual(expectedOptions);
  });
});
