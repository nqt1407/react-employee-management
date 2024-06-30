import { useMemo } from 'react';
import { RouterProvider } from 'react-router-dom';

import { AppProvider } from './AppProvider';
import { createRouter } from './routes';

const AppRoutes = () => {
  const appRoutes = useMemo(() => createRouter(), []);
  return <RouterProvider router={appRoutes} />;
};

export const App = () => (
  <AppProvider>
    <AppRoutes />
  </AppProvider>
);
