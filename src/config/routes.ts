export const routes = {
  landing: {
    path: '/',
    getHref: () => '/',
  },
  employees: {
    path: '/employees',
    getHref: () => '/employees',
  },
  employee: {
    path: '/employees/:id',
    getHref: (id: string) => `/employees/${id}`,
  },
  newEmployee: {
    path: '/employees/new',
    getHref: () => '/employees/new',
  },
};
