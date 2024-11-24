import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { ContentLayout } from '@/components/layouts/content-layout';
import { EmployeeForm } from '@/presentation/employees/components/form';
import { useCreateEmployee } from '@/presentation/employees/hooks/use-create-employee';

export const NewEmployeeRoute = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const createEmployeeMutation = useCreateEmployee({
    onSuccess: () => navigate('/employees'),
  });

  return (
    <ContentLayout title={t('employee.create.title')}>
      <EmployeeForm
        type="create"
        onSubmit={(formValues) => createEmployeeMutation.mutate(formValues)}
      />
    </ContentLayout>
  );
};
