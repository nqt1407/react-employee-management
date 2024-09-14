import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { Listbox } from './Listbox';

const meta: Meta<typeof Listbox> = {
  title: 'Components/Forms/Listbox',
  component: Listbox,
  parameters: {
    layout: 'centered',
    controls: { expanded: true },
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof Listbox>;

export const Default: Story = {
  render: () => {
    const options = [
      { key: 'Option 1', value: '1' },
      { key: 'Option 2', value: '2' },
      { key: 'Option 3', value: '3' },
    ];

    const [selected, setSelected] = useState(options[0].value);

    return (
      <Listbox<string>
        label="Select an option"
        value={selected}
        onChange={setSelected}
        options={[
          { key: 'Option 1', value: '1' },
          { key: 'Option 2', value: '2' },
          { key: 'Option 3', value: '3' },
        ]}
      />
    );
  },
};
