import type { QueryClient } from '@tanstack/react-query';
import { createBrowserRouter } from 'react-router-dom';

import { ErrorFallBack } from '@/components/errors/error-fallback';
import { routes } from '@/config/routes';

const load = (queryClient?: QueryClient) => async (module: any) => {
  const { default: component, ...rest } = module;
  return {
    ...rest,
    loader: component.loader?.(queryClient),
    Component: component?.element,
  };
};

export const createRouter = (queryClient: QueryClient) =>
  createBrowserRouter([
    {
      path: routes.landing.path,
      ErrorBoundary: ErrorFallBack,
      children: [
        {
          index: true,
          lazy: () => import('./Landing').then(load()),
        },
        {
          path: routes.employees.path,
          lazy: () => import('./employees/Employees').then(load(queryClient)),
        },
        {
          path: routes.newEmployee.path,
          lazy: () => import('./employees/NewEmployee').then(load()),
        },
        {
          path: routes.employee.path,
          lazy: () =>
            import('./employees/UpdateEmployee').then(load(queryClient)),
        },
      ],
    },
    {
      path: '*',
      lazy: () => import('./NotFound').then(load()),
    },
  ]);
