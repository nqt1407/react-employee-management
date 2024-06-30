import { render, fireEvent } from '@/testing/test-utils';

import { Select } from '../Select';

const mockOptions = [
  { key: 'Option 1', value: '1' },
  { key: 'Option 2', value: '2' },
  { key: 'Option 3', value: '3' },
];

describe('Select Component', () => {
  test('renders without errors', () => {
    const { getByText } = render(
      <Select options={mockOptions} label="Test label" />,
    );

    expect(getByText('Test label')).toBeInTheDocument();
  });

  test('calls onChange when an option is selected', () => {
    const onChangeMock = vi.fn();
    const { getByLabelText } = render(
      <Select
        options={mockOptions}
        label="Select an option"
        onChange={onChangeMock}
      />,
    );

    const selectElement = getByLabelText('Select an option');

    fireEvent.change(selectElement, { target: { value: '2' } });

    expect(onChangeMock).toHaveBeenCalledWith(
      expect.objectContaining({
        target: expect.objectContaining({ value: '2' }),
      }),
    );
  });

  test('sets default value when defaultValue prop is provided', () => {
    const { getByDisplayValue } = render(
      <Select
        options={mockOptions}
        label="Select an option"
        defaultValue="2"
      />,
    );

    const defaultValueElement = getByDisplayValue('Option 2');
    expect(defaultValueElement).toBeInTheDocument();
  });
});
