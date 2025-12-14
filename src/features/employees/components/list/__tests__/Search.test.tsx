import { MemoryRouter, useLocation } from 'react-router-dom';

import { render, screen, act, fireEvent } from '@/testing/test-utils';

import { Search } from '../Search';

const LocationDisplay = () => {
  const location = useLocation();
  return <div data-testid="location-search">{location.search}</div>;
};

describe('Search', () => {
  it('should render search input', async () => {
    render(
      <MemoryRouter>
        <Search />
      </MemoryRouter>,
    );
    expect(
      screen.getByPlaceholderText(/Please enter employee name/i),
    ).toBeInTheDocument();
  });

  it('should update search params after debounce', async () => {
    vi.useFakeTimers();
    render(
      <MemoryRouter>
        <Search />
        <LocationDisplay />
      </MemoryRouter>,
    );

    const input = screen.getByPlaceholderText(/Please enter employee name/i);

    fireEvent.change(input, { target: { value: 'test' } });

    expect(screen.getByTestId('location-search')).toHaveTextContent('');

    act(() => {
      vi.advanceTimersByTime(500);
    });

    expect(screen.getByTestId('location-search')).toHaveTextContent(
      '?name=test',
    );
    vi.useRealTimers();
  });

  it('should clear search params when input is cleared', async () => {
    vi.useFakeTimers();
    render(
      <MemoryRouter initialEntries={['?name=initial']}>
        <Search />
        <LocationDisplay />
      </MemoryRouter>,
    );

    const input = screen.getByPlaceholderText(/Please enter employee name/i);

    expect(screen.getByTestId('location-search')).toHaveTextContent(
      '?name=initial',
    );

    fireEvent.change(input, { target: { value: '' } });

    act(() => {
      vi.advanceTimersByTime(500);
    });

    expect(screen.getByTestId('location-search')).toHaveTextContent('');
    vi.useRealTimers();
  });
});
