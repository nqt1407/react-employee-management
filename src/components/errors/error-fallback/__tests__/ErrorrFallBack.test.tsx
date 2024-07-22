import { render } from '@/testing/test-utils';

import { ErrorFallBack } from '../ErrorFallBack';

describe('Spinner Component', () => {
  test('renders error correctly', () => {
    const { getByText } = render(<ErrorFallBack />);
    expect(getByText('Something went wrong!')).toBeInTheDocument();
  });
});
