import type { Meta, StoryObj } from '@storybook/react';
import 'react-datepicker/dist/react-datepicker.css';
import { useState } from 'react';

import { DatePicker, DatePickerProps } from './DatePicker';

const meta: Meta<DatePickerProps> = {
  title: 'Components/Pickers/DatePicker',
  component: DatePicker,
  parameters: {
    layout: 'centered',
    controls: { expanded: true },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<DatePickerProps>;

export const Default: Story = {
  render: () => {
    const [startDate, setStartDate] = useState<Date | null>(null);

    const selectDateHandler = (d: Date | null) => {
      setStartDate(d);
    };

    return (
      <DatePicker
        label="Selected date"
        selected={startDate}
        onChange={selectDateHandler}
        required
      />
    );
  },
};
