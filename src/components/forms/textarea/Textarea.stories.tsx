import type { Meta, StoryObj } from '@storybook/react';

import { Textarea, TextAreaProps } from './Textarea';

const meta: Meta<TextAreaProps> = {
  title: 'Components/Forms/Textarea',
  component: Textarea,
  parameters: {
    layout: 'centered',
    controls: { expanded: true },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<TextAreaProps>;

export const Default: Story = {
  render: (args: TextAreaProps) => {
    return <Textarea {...args} name="default-input" />;
  },
};
