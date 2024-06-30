import { ErrorBoundary } from 'react-error-boundary';
import * as z from 'zod';

import { render, userEvent, waitFor, act } from '@/testing/test-utils';

import { Button } from '../../button';
import { InputText } from '../../input-text';
import { Form, ConnectForm } from '../Form';

const testData = {
  title: 'Hello World',
};

const schema = z.object({
  title: z.string().min(1, 'Required'),
});

const renderForm = () => {
  const handleSubmit = vi.fn();
  const renderResult = render(
    <Form<typeof schema, typeof testData>
      onSubmit={handleSubmit}
      schema={schema}
    >
      {({ register, formState }) => (
        <>
          <InputText
            id="title"
            label="Title"
            error={formState.errors['title']?.message}
            register={register('title')}
          />
          <Button name="submit" type="submit">
            Submit
          </Button>
        </>
      )}
    </Form>,
  );

  return {
    ...renderResult,
    handleSubmit,
  };
};

const renderFormWithSubForm = () => {
  const handleSubmit = vi.fn();

  const renderResult = render(
    <Form<typeof schema> onSubmit={handleSubmit} schema={schema}>
      {() => (
        <>
          <ConnectForm<typeof schema>>
            {({ register, formState }) => (
              <>
                <InputText
                  label="Title"
                  error={formState.errors['title']?.message}
                  register={register('title')}
                  id="input"
                />
              </>
            )}
          </ConnectForm>
          <Button name="submit" type="submit">
            Submit
          </Button>
        </>
      )}
    </Form>,
  );

  return {
    ...renderResult,
    handleSubmit,
  };
};

const renderSubFormWithoutForm = () => {
  const renderResult = render(
    <ErrorBoundary FallbackComponent={() => <div>Something wrong</div>}>
      <ConnectForm<typeof schema>>
        {({ register }) => (
          <>
            <InputText id="input" label="Title" register={register('title')} />
          </>
        )}
      </ConnectForm>
      <Button name="submit" type="submit">
        Submit
      </Button>
    </ErrorBoundary>,
  );

  return {
    ...renderResult,
  };
};

describe('Form Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('Form should render with specific fields', () => {
    const { getByLabelText, getByRole } = renderForm();

    expect(getByLabelText('Title')).toBeInTheDocument();

    expect(getByRole('button', { name: 'Submit' })).toBeInTheDocument();
  });

  test('Submitting the form should call handleSubmit with valid data', async () => {
    const { handleSubmit, getByRole, getByLabelText } = renderForm();

    const textFieldElement = getByLabelText('Title');

    const submitBtnElement = getByRole('button', { name: 'Submit' });

    await act(async () => {
      await userEvent.type(textFieldElement, testData.title);
      await userEvent.click(submitBtnElement);
    });

    await waitFor(() => {
      expect(handleSubmit).toHaveBeenCalledTimes(1);
      expect(handleSubmit).toHaveBeenCalledWith(testData, expect.anything());
    });
  });

  test('Submitting the form should display validation error if validation fails', async () => {
    const { handleSubmit, getByText, getByRole } = renderForm();

    userEvent.click(getByRole('button', { name: 'Submit' }));

    await waitFor(() => {
      const helperTextElement = getByText('Required');
      expect(helperTextElement).toBeInTheDocument();
    });

    expect(handleSubmit).toHaveBeenCalledTimes(0);
  });
});

describe('ConnectForm component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('Form should render with specific fields', () => {
    const { getByLabelText, getByRole } = renderFormWithSubForm();

    expect(getByLabelText(/title/i)).toBeInTheDocument();
    expect(getByRole('button', { name: 'Submit' })).toBeInTheDocument();
  });

  test('Submitting the form should call handleSubmit with valid data', async () => {
    const { handleSubmit, getByRole } = renderFormWithSubForm();

    const textFieldElement = getByRole('textbox', {
      name: 'Title',
    });

    const submitBtnElement = getByRole('button', { name: 'Submit' });

    await act(async () => {
      await userEvent.type(textFieldElement, testData.title);
      await userEvent.click(submitBtnElement);
    });

    await waitFor(() => {
      expect(handleSubmit).toHaveBeenCalledTimes(1);
      expect(handleSubmit).toHaveBeenCalledWith(testData, expect.anything());
    });
  });

  test('Submitting the form should display validation error if validation fails', async () => {
    const { handleSubmit, getByText, getByRole } = renderForm();

    userEvent.click(getByRole('button', { name: 'Submit' }));

    await waitFor(() => {
      const helperTextElement = getByText('Required');
      expect(helperTextElement).toBeInTheDocument();
    });

    expect(handleSubmit).toHaveBeenCalledTimes(0);
  });

  test('errors is thrown when attempting to use methods that have not been wrapped with a Form', async () => {
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    renderSubFormWithoutForm();

    expect(errorSpy).toHaveBeenCalledTimes(3);
    errorSpy.mockRestore();
  });
});
