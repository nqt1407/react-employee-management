import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { ContentLayout } from '@/components/layouts/content-layout';
import {
  EmployeeForm,
  EmployeeFormValues,
} from '@/features/employees/components/form';
import { mappingFormValuesToEntity } from '@/features/employees/helper';
import { useCreateEmployee } from '@/features/employees/hooks/use-create-employee';

export const NewEmployeeRoute = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { mutate: createEmployeeMutation } = useCreateEmployee({
    onSuccess: () => navigate('/employees'),
  });

  const onSubmitCreate = (formValues: EmployeeFormValues) => {
    createEmployeeMutation(mappingFormValuesToEntity(formValues));
  };

  return (
    <ContentLayout title={t('employee.create.title')}>
      <EmployeeForm type="create" onSubmit={onSubmitCreate} />
    </ContentLayout>
  );
};
