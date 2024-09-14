import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { Option } from '../select';

import { Combobox } from './Combobox';

const meta: Meta<typeof Combobox> = {
  title: 'Components/Forms/Combobox',
  component: Combobox,
  parameters: {
    layout: 'centered',
    controls: { expanded: true },
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof Combobox>;

export const Default: Story = {
  render: () => {
    const options = [
      { key: 'The Shawshank Redemption', value: '1' },
      { key: 'The Dark Knight', value: '2' },
      { key: 'Pulp Fiction', value: '3' },
    ];

    const [selected, setSelected] = useState<Option>(options[0]);

    return (
      <Combobox
        label="Select an option"
        value={selected}
        onChange={(selected) => selected && setSelected(selected)}
        by="value"
        options={options}
      />
    );
  },
};
