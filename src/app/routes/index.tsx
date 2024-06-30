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
      lazy: async () => {
        const { EmployeesRoute } = await import('./employees/Employees');
        return { Component: EmployeesRoute };
      },
      errorElement: <ErrorFallBack />,
    },
    {
      path: '/employees/new',
      lazy: async () => {
        const { NewEmployeeRoute } = await import('./employees/NewEmployee');
        return { Component: NewEmployeeRoute };
      },
      errorElement: <ErrorFallBack />,
    },
    {
      path: '/employees/:id',
      lazy: async () => {
        const { UpdateEmployeeRoute } = await import(
          './employees/UpdateEmployee'
        );
        return { Component: UpdateEmployeeRoute };
      },
      errorElement: <ErrorFallBack />,
    },
  ]);
