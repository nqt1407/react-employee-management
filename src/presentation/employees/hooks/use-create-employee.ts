import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

import { createEmployee as createEmployeeUseCase } from '@/application/employees/create';
import { createRepository } from '@/infrastructure/employees/repositories/create';
import { MutationConfig } from '@/lib/react-query';

const employeeRepository = createRepository();

type createEmployee = ReturnType<Awaited<typeof createEmployeeUseCase>>;

type UseCreateEmployeeOptions = MutationConfig<createEmployee>;

export const useCreateEmployee = (
  mutationConfig: UseCreateEmployeeOptions = {},
) => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const { onSuccess, ...restConfig } = mutationConfig;

  return useMutation({
    mutationFn: (newEmployee) =>
      createEmployeeUseCase(employeeRepository)(newEmployee),
    onSuccess: async (...args) => {
      await queryClient.refetchQueries({ queryKey: ['employees'] });
      toast.success(t('employee.create.toast.success'));
      onSuccess?.(...args);
    },
    onError: (error) => {
      toast.error(t('employee.create.toast.failed'));
      console.error(error);
    },
    ...restConfig,
  });
};
