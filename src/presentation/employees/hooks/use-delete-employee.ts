import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

import { deleteEmployee as deleteEmployeeUseCase } from '@/application/employees/delete';
import { deleteRepository } from '@/infrastructure/employees/repositories/delete';
import { MutationConfig } from '@/lib/react-query';

const employeeRepository = deleteRepository();

type createEmployee = ReturnType<Awaited<typeof deleteEmployeeUseCase>>;

type UseDeleteEmployeeOptions = MutationConfig<createEmployee>;

export const useDeleteEmployee = (
  mutationConfig: UseDeleteEmployeeOptions = {},
) => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const { onSuccess, ...restConfig } = mutationConfig;

  return useMutation({
    mutationFn: (id) => deleteEmployeeUseCase(employeeRepository)(id),
    onSuccess: async (...args) => {
      await queryClient.refetchQueries({ queryKey: ['employees'] });
      toast.success(t('employee.delete.toast.success'));
      onSuccess?.(...args);
    },
    onError: (error) => {
      toast.error(t('employee.delete.toast.failed'));
      console.error(error);
    },
    ...restConfig,
  });
};
