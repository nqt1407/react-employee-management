import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from '@testing-library/react';

import {
  Popover,
  PopoverButton,
  PopoverContent,
  PopoverCloseButton,
  PopoverOverlay,
  PopoverGroup,
} from '../Popover';

describe('Popover', () => {
  test('renders the correctly', () => {
    render(
      <PopoverGroup>
        <Popover>
          <PopoverButton>Open Popover</PopoverButton>
          <PopoverContent>Content</PopoverContent>
        </Popover>
      </PopoverGroup>,
    );

    waitFor(() => {
      expect(screen.getByText('Open Popover')).toBeInTheDocument();
    });
  });

  test('opens the Popover on button click', () => {
    render(
      <PopoverGroup>
        <Popover>
          <PopoverButton>Open Popover</PopoverButton>
          <PopoverOverlay />
          <PopoverContent>Content</PopoverContent>
        </Popover>
      </PopoverGroup>,
    );

    act(() => {
      fireEvent.click(screen.getByText('Open Popover'));
    });

    expect(screen.getByText('Content')).toBeVisible();
  });

  test('closes the Popover on close button click', () => {
    render(
      <PopoverGroup>
        <Popover>
          <PopoverButton>Open Popover</PopoverButton>
          <PopoverOverlay />
          <PopoverContent>
            Content
            <PopoverCloseButton>Close button</PopoverCloseButton>
          </PopoverContent>
        </Popover>
      </PopoverGroup>,
    );

    act(() => {
      fireEvent.click(screen.getByText('Open Popover'));
    });

    expect(screen.getByText('Content')).toBeVisible();

    waitFor(() => {
      expect(screen.queryByText('Content')).not.toBeVisible();
    });

    act(() => {
      fireEvent.click(screen.getByText('Close button'));
    });

    waitFor(() => {
      expect(screen.queryByText('Content')).not.toBeVisible();
    });
  });
});
