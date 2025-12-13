import { useQueryClient } from '@tanstack/react-query';
import { useMemo } from 'react';
import { RouterProvider } from 'react-router-dom';

import { AppProvider } from './AppProvider';
import { createRouter } from './routes';

const AppRoutes = () => {
  const queryClient = useQueryClient();
  const appRoutes = useMemo(() => createRouter(queryClient), [queryClient]);
  return <RouterProvider router={appRoutes} />;
};

export const App = () => (
  <AppProvider>
    <AppRoutes />
  </AppProvider>
);
