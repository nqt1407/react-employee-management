import type { Meta, StoryObj } from '@storybook/react';

import { Entry, EntryProps } from './Entry';

const meta: Meta<EntryProps> = {
  title: 'Components/Display Data/Entry',
  component: Entry,
  parameters: {
    layout: 'centered',
    controls: { expanded: true },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<EntryProps>;

export const Default: Story = {
  args: {
    label: 'Example Label',
    content: 'This is an example content.',
  },
};
