import type { QueryClient } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import {
  useParams,
  useNavigate,
  type LoaderFunctionArgs,
} from 'react-router-dom';

import { Spinner } from '@/components/feedback/spinner';
import { ContentLayout } from '@/components/layouts/content-layout';
import {
  EmployeeForm,
  EmployeeFormValues,
} from '@/features/employees/components/form';
import {
  mappingFormValuesToEntity,
  mappingEmployeeDataToFormValues,
} from '@/features/employees/helper';
import {
  useEmployee,
  getEmployeeQueryOptions,
} from '@/features/employees/hooks/use-employee';
import { useUpdateEmployee } from '@/features/employees/hooks/use-update-employee';
import type { UpdateEmployee } from '@/types/api/update-employee';

const employeeLoader =
  (queryClient: QueryClient) =>
  async ({ params }: LoaderFunctionArgs) => {
    const query = getEmployeeQueryOptions(Number(params.id));
    return (
      queryClient.getQueryData(query.queryKey) ??
      (await queryClient.fetchQuery(query))
    );
  };

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
    const { id, ...updateReq } = mappingFormValuesToEntity(formValues);
    updateEmployeeMutation({
      id: id!,
      updateReq: updateReq as UpdateEmployee,
    });
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
    <ContentLayout
      title={t('employee.update.title')}
      description={t('employee.update.description')}
    >
      <EmployeeForm
        type="edit"
        onSubmit={onSubmitUpdate}
        initialData={mappingEmployeeDataToFormValues(employeeData)}
      />
    </ContentLayout>
  );
};

const UpdateEmployeeRouteConfig = {
  element: UpdateEmployeeRoute,
  loader: employeeLoader,
} as const;

export default UpdateEmployeeRouteConfig;
