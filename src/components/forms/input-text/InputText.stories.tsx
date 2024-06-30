import type { Meta, StoryObj } from '@storybook/react';

import { InputText, InputTextProps } from './InputText';

const meta: Meta<InputTextProps> = {
  title: 'Components/InputText',
  component: InputText,
  parameters: {
    layout: 'centered',
    controls: { expanded: true },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<InputTextProps>;

export const Default: Story = {
  render: (args: InputTextProps) => {
    return <InputText {...args} name="default-input" />;
  },
};
