import { createBrowserRouter } from 'react-router-dom';

import { ErrorFallBack } from '@/components/errors/error-fallback';

export const createRouter = () =>
  createBrowserRouter([
    {
      path: '/',
      lazy: async () => {
        const { LandingRoute } = await import('./Landing');
        return { Component: LandingRoute };
      },
      errorElement: <ErrorFallBack />,
    },
    {
      path: '/employees',
      errorElement: <ErrorFallBack />,
      children: [
        {
          index: true,
          lazy: async () => {
            const { EmployeesRoute } = await import('./employees/Employees');
            return { Component: EmployeesRoute };
          },
        },
        {
          path: 'new',
          lazy: async () => {
            const { NewEmployeeRoute } = await import(
              './employees/NewEmployee'
            );
            return { Component: NewEmployeeRoute };
          },
        },
        {
          path: ':id',
          lazy: async () => {
            const { UpdateEmployeeRoute } = await import(
              './employees/UpdateEmployee'
            );
            return { Component: UpdateEmployeeRoute };
          },
        },
      ],
    },
    {
      path: '*',
      lazy: async () => {
        const { NotFoundRoute } = await import('./NotFound');
        return { Component: NotFoundRoute };
      },
    },
  ]);
