import type { Meta, StoryObj } from '@storybook/react';

import { Popover, PopoverButton, PopoverContent } from './Popover';

const meta: Meta<typeof Popover> = {
  title: 'Components/Overlay/Textarea',
  component: Popover,
  parameters: {
    layout: 'centered',
    controls: { expanded: true },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Popover>;

export const Default: Story = {
  render: () => {
    return (
      <Popover className="relative">
        <PopoverButton className="text-sm/6 font-semibold focus:outline-none data-[active]:text-black data-[hover]:text-black data-[focus]:outline-1 data-[focus]:outline-black">
          Popover
        </PopoverButton>
        <PopoverContent anchor="bottom" className="flex flex-col bg-black/70">
          <div className="p-3">
            <div className="block rounded-lg py-2 px-3 transition hover:bg-black/5">
              <p className="font-semibold text-white">Insights</p>
              <p className="text-white/50">Measure actions your users take</p>
            </div>
            <div className="block rounded-lg py-2 px-3 transition hover:bg-black/5">
              <p className="font-semibold text-white">Automations</p>
              <p className="text-white/50">Create your own targeted content</p>
            </div>
            <div className="block rounded-lg py-2 px-3 transition hover:bg-black/5">
              <p className="font-semibold text-white">Reports</p>
              <p className="text-white/50">Keep track of your growth</p>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    );
  },
};
