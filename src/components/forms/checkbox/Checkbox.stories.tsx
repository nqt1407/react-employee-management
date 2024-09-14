import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { Checkbox, CheckboxProps } from './Checkbox';

const meta: Meta<CheckboxProps> = {
  title: 'Components/Forms/Checkbox',
  component: Checkbox,
  parameters: {
    layout: 'centered',
    controls: { expanded: true },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<CheckboxProps>;

export const Default: Story = {
  render: () => {
    const [enabled, setEnabled] = useState(true);

    return <Checkbox checked={enabled} onChange={setEnabled} />;
  },
};
