import { render } from '@/testing/test-utils';

import { Spinner } from '../Spinner';

describe('Spinner Component', () => {
  test('renders spinner with specified size and color', () => {
    const { getByTestId } = render(<Spinner size="lg" color="red" />);
    const spinnerElement = getByTestId('loading-spinner');

    expect(spinnerElement).toBeInTheDocument();
    expect(spinnerElement).toHaveClass('h-16 w-16');
    expect(spinnerElement).toHaveClass('animate-spin h-16 w-16 text-red-500');
  });

  test('applies custom className', () => {
    const { getByTestId } = render(<Spinner className="custom-class" />);
    const spinnerElement = getByTestId('loading-spinner');

    expect(spinnerElement).toHaveClass('animate-spin h-8 w-8 custom-class');
  });
});
