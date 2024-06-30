import {
  render,
  waitForElementToBeRemoved,
  screen,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';

import { AppProvider } from '@/app/AppProvider';

export const waitForLoadingToFinish = () =>
  waitForElementToBeRemoved(
    () => [
      ...screen.queryAllByTestId(/Loading/i),
      ...screen.queryAllByText(/Loading/i),
    ],
    { timeout: 4000 },
  );

export const renderApp = async (
  ui: any,
  { url = '', path = '/', ...renderOptions }: Record<string, any> = {},
) => {
  const router = createMemoryRouter(
    [
      {
        path,
        element: ui,
      },
    ],
    {
      initialEntries: url ? ['/', url] : ['/'],
      initialIndex: url ? 1 : 0,
    },
  );

  const renderValue = {
    ...render(ui, {
      wrapper: () => {
        return (
          <AppProvider>
            <RouterProvider router={router} />
          </AppProvider>
        );
      },
      ...renderOptions,
    }),
  };

  // * enable this if need to loading progress complete
  // await waitForLoadingToFinish();

  return renderValue;
};

// eslint-disable-next-line react-refresh/only-export-components
export * from '@testing-library/react';
export { userEvent };
