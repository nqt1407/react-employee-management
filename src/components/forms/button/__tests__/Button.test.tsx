import { render, fireEvent } from '@/testing/test-utils';

import { Button, ButtonProps } from '../Button';

describe('Button Component', () => {
  const onClickMock = vi.fn();

  const renderButton = (props: ButtonProps) => {
    return render(
      <Button {...props} onClick={onClickMock}>
        {props.children}
      </Button>,
    );
  };

  test('calls onClick handler when clicked', () => {
    const { getByRole } = renderButton({ children: 'Click me' });
    const buttonElement = getByRole('button', { name: 'Click me' });

    fireEvent.click(buttonElement);

    expect(onClickMock).toHaveBeenCalled();
  });

  test('renders button with startIcon', () => {
    const startIcon = <span data-testid="start-icon">🚀</span>;
    const { getByText, getByTestId } = renderButton({
      children: 'Click me',
      startIcon,
    });

    expect(getByText('Click me')).toBeInTheDocument();
    expect(getByTestId('start-icon')).toContainElement(getByText('🚀'));
  });

  test('renders button with endIcon', () => {
    const endIcon = <span data-testid="end-icon">✨</span>;
    const { getByText, getByTestId } = renderButton({
      children: 'Click me',
      endIcon,
    });

    expect(getByText('Click me')).toBeInTheDocument();
    expect(getByTestId('end-icon')).toContainElement(getByText('✨'));
  });

  test('renders button with loading state', () => {
    const { getByText, getByTestId } = renderButton({
      isLoading: true,
      loadingText: 'Loading...',
      children: 'Click me',
    });

    expect(getByTestId('loading-spinner')).toBeInTheDocument();

    expect(getByText('Loading...')).toBeInTheDocument();
  });

  test('renders spinner at correct placement when isLoading is true', () => {
    // Render button with isLoading=true and spinnerPlacement='start'
    const props1: ButtonProps = { isLoading: true, spinnerPlacement: 'start' };
    const { container: container1 } = renderButton(props1);
    const spinner1 = container1.querySelector(
      '[data-testid="loading-spinner"]',
    );
    expect(spinner1).toBeInTheDocument();

    // Render button with isLoading=true and spinnerPlacement='end'
    const props2: ButtonProps = { isLoading: true, spinnerPlacement: 'end' };
    const { container: container2 } = renderButton(props2);
    const spinner2 = container2.querySelector(
      '[data-testid="loading-spinner"]',
    );
    expect(spinner2).toBeInTheDocument();
  });
});
