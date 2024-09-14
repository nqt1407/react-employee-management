import type { Meta, StoryObj } from '@storybook/react';

import { Select, SelectProps } from './Select';

const meta: Meta<SelectProps> = {
  title: 'Components/Forms/Select',
  component: Select,
  parameters: {
    layout: 'centered',
    controls: { expanded: true },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<SelectProps>;

export const Default: Story = {
  render: (args: SelectProps) => {
    return (
      <Select
        {...args}
        options={[
          { key: 'Value 1', value: 'id-1' },
          { key: 'Value 2', value: 'id-2' },
        ]}
      />
    );
  },
};
