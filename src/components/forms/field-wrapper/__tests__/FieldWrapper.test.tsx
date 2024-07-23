import { render, screen } from '@/testing/test-utils';

import { FieldWrapper, FieldWrapperProps } from '../FieldWrapper';

const renderComponent = (props: Partial<FieldWrapperProps> = {}) => {
  return render(
    <FieldWrapper label="Test Label" {...props}>
      <input type="text" />
    </FieldWrapper>,
  );
};

describe('FieldWrapper', () => {
  test('renders the label', () => {
    renderComponent();
    expect(screen.getByText('Test Label')).toBeInTheDocument();
  });

  test('renders the children', () => {
    renderComponent();
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  test('renders error message', () => {
    renderComponent({ error: 'Test error' });
    expect(screen.getByRole('alert')).toBeInTheDocument();
    expect(screen.getByText('Test error')).toBeInTheDocument();
  });

  test('renders required indicator', () => {
    renderComponent({ required: true });
    expect(screen.getByText('*')).toBeInTheDocument();
  });

  test('renders with additional class name', () => {
    renderComponent({ className: 'additional-class' });
    const label = screen.getByText('Test Label');
    expect(label).toHaveClass('additional-class');
  });
});
