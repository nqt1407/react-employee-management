import { useTranslation } from 'react-i18next';
import { useParams, useNavigate } from 'react-router-dom';

import { Spinner } from '@/components/feedback/spinner';
import { ContentLayout } from '@/components/layouts/content-layout';
import {
  EmployeeForm,
  EmployeeFormValues,
} from '@/presentation/employees/components/form';
import { useEmployee } from '@/presentation/employees/hooks/use-employee';
import { useUpdateEmployee } from '@/presentation/employees/hooks/use-update-employee';

export const UpdateEmployeeRoute = () => {
  const params = useParams();
  const employeeId = params.id as string;

  const navigate = useNavigate();
  const { t } = useTranslation();

  const { data: employeeData, isLoading } = useEmployee({
    employeeId,
  });

  const { mutate: updateEmployeeMutation } = useUpdateEmployee({
    employeeId,
    mutationConfig: {
      onSuccess: () => navigate('/employees'),
    },
  });

  const onSubmitUpdate = (formValues: EmployeeFormValues) => {
    updateEmployeeMutation({ id: employeeId, ...formValues });
  };

  if (isLoading) {
    return (
      <div className="flex h-48 w-full items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!employeeData)
    return (
      <div
        role="list"
        aria-label="employees"
        className="flex h-40 flex-col items-center justify-center bg-white text-gray-500"
      >
        <h4>{t('employee.update.noEmployeeFound')}</h4>
      </div>
    );

  return (
    <ContentLayout title={t('employee.update.title')}>
      {employeeData && (
        <EmployeeForm
          type="edit"
          onSubmit={onSubmitUpdate}
          initialData={employeeData}
        />
      )}
    </ContentLayout>
  );
};
