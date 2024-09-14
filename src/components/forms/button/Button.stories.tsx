import type { Meta, StoryObj } from '@storybook/react';

import { Button, ButtonProps } from './Button';

const meta: Meta<ButtonProps> = {
  title: 'Components/Forms/Button',
  component: Button,
  parameters: {
    layout: 'centered',
    controls: { expanded: true },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<ButtonProps>;

export const Contained: Story = {
  args: {
    children: 'Button',
  },
  render: (args: ButtonProps) => {
    return <Button {...args} />;
  },
};

export const Outlined: Story = {
  args: {
    children: 'Button',
    variant: 'outlined',
  },
  render: (args: ButtonProps) => {
    return <Button {...args} />;
  },
};

export const Text: Story = {
  args: {
    children: 'Button',
    variant: 'text',
  },
  render: (args: ButtonProps) => {
    return <Button {...args} />;
  },
};
