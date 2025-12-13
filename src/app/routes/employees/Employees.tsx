import type { QueryClient } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import type { LoaderFunctionArgs } from 'react-router-dom';

import { ContentLayout } from '@/components/layouts/content-layout';
import { EmployeesList } from '@/features/employees/components/list';
import { getInfiniteEmployeesQueryOptions } from '@/features/employees/hooks/use-employees';

const employeesLoader =
  (queryClient: QueryClient) =>
  async ({ request }: LoaderFunctionArgs) => {
    const search = new URL(request.url).searchParams.get('name') || undefined;
    const query = getInfiniteEmployeesQueryOptions({
      search,
    });

    return (
      queryClient.getQueryData(query.queryKey) ??
      (await queryClient.fetchInfiniteQuery(query))
    );
  };

export const EmployeesRoute = () => {
  const { t } = useTranslation();
  return (
    <ContentLayout
      title={t('employee.list.title')}
      description={t('employee.list.description')}
    >
      <EmployeesList />
    </ContentLayout>
  );
};

const EmployeesRouteConfig = {
  element: EmployeesRoute,
  loader: employeesLoader,
} as const;

export default EmployeesRouteConfig;
