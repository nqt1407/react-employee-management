import { render, userEvent, act } from '@/testing/test-utils';

import { InputText } from '../InputText';

describe('InputText Component', () => {
  test('renders without errors', () => {
    const { getByText } = render(<InputText label="Test label" />);
    expect(getByText('Test label')).toBeInTheDocument();
  });

  test('onChange should be called', async () => {
    const onChange = vi.fn();
    const { getByRole } = render(
      <InputText label="Test label" onChange={onChange} />,
    );

    const textFieldElement = getByRole('textbox');
    await act(async () => {
      await userEvent.type(textFieldElement, 'test input');
    });

    expect(onChange).toHaveBeenCalled();
    expect(textFieldElement).toHaveValue('test input');
  });
});
