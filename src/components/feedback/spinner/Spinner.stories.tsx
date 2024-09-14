import type { Meta, StoryObj } from '@storybook/react';

import { Spinner, SpinnerProps } from './Spinner';

const meta: Meta<SpinnerProps> = {
  title: 'Components/Feedback/Spinner',
  component: Spinner,
  parameters: {
    layout: 'centered',
    controls: { expanded: true },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<SpinnerProps>;

export const Default: Story = {
  render: (args: SpinnerProps) => {
    return <Spinner {...args} />;
  },
};
