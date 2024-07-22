import { useMutation, useQueryClient } from '@tanstack/react-query';
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
  const queryClient = useQueryClient();
  const { onSuccess, ...restConfig } = mutationConfig;

  return useMutation({
    mutationFn: (employee) =>
      updateEmployeeUseCase(employeeRepository)(employee),
    onSuccess: async (...args) => {
      queryClient.refetchQueries({
        queryKey: getEmployeeQueryOptions(args[1].id!).queryKey,
      });
      toast.success('Update employee successfully');
      onSuccess?.(...args);
    },
    onError: (error) => {
      toast.success('Failed to update employee! Please comeback later!');
      console.error(error);
    },
    ...restConfig,
  });
};
