import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

import { updateEmployee as updateEmployeeUseCase } from '@/application/employees/update';
import { updateRepository } from '@/infrastructure/employees/repositories/update';
import { MutationConfig } from '@/lib/react-query';

import { getEmployeeQueryOptions } from '../hooks/use-employee';

const employeeRepository = updateRepository();

type updateEmployee = ReturnType<Awaited<typeof updateEmployeeUseCase>>;

type UseUpdateEmployeeOptions = MutationConfig<updateEmployee>;

export const useUpdateEmployee = (
  mutationConfig: UseUpdateEmployeeOptions = {},
) => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const { onSuccess, ...restConfig } = mutationConfig;

  return useMutation({
    mutationFn: (employee) =>
      updateEmployeeUseCase(employeeRepository)(employee),
    onSuccess: async (...args) => {
      queryClient.refetchQueries({
        queryKey: getEmployeeQueryOptions(args[1].id!).queryKey,
      });
      toast.success(t('employee.update.toast.success'));
      onSuccess?.(...args);
    },
    onError: (error) => {
      toast.error(t('employee.update.toast.failed'));
      console.error(error);
    },
    ...restConfig,
  });
};
