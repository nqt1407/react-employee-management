import type { Meta, StoryObj } from '@storybook/react';

import { Stepper } from './Stepper';
import { StepperProps } from './types';

const meta: Meta<StepperProps> = {
  title: 'Components/Navigation/Stepper',
  component: Stepper,
  parameters: {
    layout: 'centered',
    controls: { expanded: true },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<StepperProps>;

export const Default: Story = {
  render: (args: StepperProps) => {
    return <Stepper {...args} />;
  },
  args: {
    currentIndex: 0,
    orientation: 'vertical',
    steps: [
      {
        label: 'Select campaign settings',
        description: `For each ad campaign that you create, you can control how much
                  you're willing to spend on clicks and conversions, which networks
                  and geographical locations you want your ads to show on, and more.`,
      },
      {
        label: 'Create an ad group',
        description:
          'An ad group contains one or more ads which target a shared set of keywords.',
      },
      {
        label: 'Create an ad',
        description: `Try out different ad text to see what brings in the most customers,
                  and learn how to enhance your ads using features like ad extensions.
                  If you run into any problems with your ads, find out how to tell if
                  they're running and how to resolve approval issues.`,
      },
    ],
  },
};
