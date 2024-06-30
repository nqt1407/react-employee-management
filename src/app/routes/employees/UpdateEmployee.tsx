import { useTranslation } from 'react-i18next';
import { useParams, useNavigate } from 'react-router-dom';

import { Spinner } from '@/components/feedback/spinner';
import { ContentLayout } from '@/components/layouts/content-layout';
import {
  EmployeeForm,
  EmployeeFormValues,
} from '@/presentation/employees/components/form';
import {
  mappingFormValuesToEntity,
  mappingEmployeeDataToFormValues,
} from '@/presentation/employees/helper';
import { useEmployee } from '@/presentation/employees/hooks/use-employee';
import { useUpdateEmployee } from '@/presentation/employees/hooks/use-update-employee';

export const UpdateEmployeeRoute = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const { data: employeeData, isLoading } = useEmployee({
    employeeId: Number(id),
  });

  const { mutate: updateEmployeeMutation } = useUpdateEmployee({
    onSuccess: () => navigate('/employees'),
  });

  const onSubmitUpdate = (formValues: EmployeeFormValues) => {
    updateEmployeeMutation(mappingFormValuesToEntity(formValues));
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
          initialData={mappingEmployeeDataToFormValues(employeeData)}
        />
      )}
    </ContentLayout>
  );
};
