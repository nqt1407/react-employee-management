import type { Meta, StoryObj } from '@storybook/react';

import { Button } from '../../forms/button';

import { Tooltip, TooltipProps } from './Tooltip';

const meta: Meta<TooltipProps> = {
  title: 'Components/Overlay/Tooltip',
  component: Tooltip,
  parameters: {
    layout: 'centered',
    controls: { expanded: true },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Tooltip>;

export const Default: Story = {
  render: (args) => (
    <div className="flex justify-center items-center">
      <Tooltip {...args} label="Default Tooltip">
        <Button className="px-4 py-2 bg-blue-500 text-white rounded-md">
          Hover over me
        </Button>
      </Tooltip>
    </div>
  ),
};

export const TopDirection: Story = {
  render: (args) => (
    <div className="flex justify-center items-center">
      <Tooltip {...args} label="Tooltip on top" direction="top">
        <Button colorScheme="green">Hover me (Top)</Button>
      </Tooltip>
    </div>
  ),
};

export const BottomDirection: Story = {
  render: (args) => (
    <div className="flex justify-center items-center">
      <Tooltip {...args} label="Tooltip on bottom" direction="bottom">
        <Button colorScheme="red">Hover me (Bottom)</Button>
      </Tooltip>
    </div>
  ),
};

export const LeftDirection: Story = {
  render: (args) => (
    <div className="flex justify-center items-center">
      <Tooltip {...args} label="Tooltip on left" direction="left">
        <Button className=" bg-purple-500">Hover me (Left)</Button>
      </Tooltip>
    </div>
  ),
};

export const RightDirection: Story = {
  render: (args) => (
    <div className="flex justify-center items-center">
      <Tooltip {...args} label="Tooltip on right" direction="right">
        <Button className="bg-orange-500">Hover me (Right)</Button>
      </Tooltip>
    </div>
  ),
};

export const HasArrow: Story = {
  render: (args) => (
    <div className="flex justify-center items-center">
      <Tooltip {...args} label="Tooltip with arrow" direction="top" hasArrow>
        <Button>Hover me</Button>
      </Tooltip>
    </div>
  ),
};
