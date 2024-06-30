import { ContentLayout } from '@/components/layouts/content-layout';
import { EmployeesList } from '@/presentation/employees/components/list/';

export const EmployeesRoute = () => (
  <ContentLayout title="List employees">
    <EmployeesList />
  </ContentLayout>
);
