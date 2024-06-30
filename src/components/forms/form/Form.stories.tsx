import type { Meta, StoryObj } from '@storybook/react';
import * as z from 'zod';

import { Button } from '../button';
import { InputText } from '../input-text';

import { Form } from './Form';

const testData = {
  name: 'Hello World',
  hobby: 'game',
};

const schema = z.object({
  name: z.string().min(1, 'Required'),
  hobby: z.string(),
});

const FormStory = () => {
  return (
    <Form<typeof schema>
      onSubmit={(data) => alert(JSON.stringify(data))}
      schema={schema}
      className="flex flex-col justify-content-center [&>*:not(:first-child)]:mt-4"
      options={{
        mode: 'all',
        defaultValues: testData,
      }}
    >
      {({ register, formState }) => (
        <>
          <InputText
            label="Name"
            error={formState.errors.name?.message}
            register={register('name')}
            className="w-64"
          />
          <Button name="submit" type="submit" className="w-24 h-8 self-center">
            Submit
          </Button>
        </>
      )}
    </Form>
  );
};

const meta: Meta<typeof FormStory> = {
  title: 'Components/Form',
  component: Form,
  parameters: {
    layout: 'centered',
    controls: { expanded: true },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof FormStory>;

export const Default: Story = {
  render: () => {
    return <FormStory />;
  },
};
