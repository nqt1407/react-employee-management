import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

import { updateEmployee as updateEmployeeUseCase } from '@/application/employees/update';
import { updateRepository } from '@/infrastructure/employees/repositories/update';
import { MutationConfig } from '@/lib/react-query';

import { getEmployeeQueryOptions } from '../hooks/use-employee';

const employeeRepository = updateRepository();

type updateEmployee = ReturnType<Awaited<typeof updateEmployeeUseCase>>;

type UseUpdateEmployeeOptions = {
  employeeId: string;
  mutationConfig?: MutationConfig<updateEmployee>;
};

export const useUpdateEmployee = ({
  employeeId,
  mutationConfig,
}: UseUpdateEmployeeOptions) => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    mutationFn: (employee) =>
      updateEmployeeUseCase(employeeRepository)(employee),
    onSuccess: (...args) => {
      queryClient.invalidateQueries({
        queryKey: getEmployeeQueryOptions(employeeId).queryKey,
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
