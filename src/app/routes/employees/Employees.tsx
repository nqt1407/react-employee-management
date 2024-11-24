import { ContentLayout } from '@/components/layouts/content-layout';
import { EmployeesList } from '@/presentation/employees/components/EmployeesList';

export const EmployeesRoute = () => (
  <ContentLayout title="List employees">
    <EmployeesList />
  </ContentLayout>
);
