import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

import { createEmployee as createEmployeeUseCase } from '@/core/application/employees/create';
import { createRepository } from '@/core/infrastructure/employees/repositories/create-repository';
import { MutationConfig } from '@/lib/react-query';

const employeeRepository = createRepository();

type createEmployee = ReturnType<Awaited<typeof createEmployeeUseCase>>;

type UseCreateEmployeeOptions = MutationConfig<createEmployee>;

export const useCreateEmployee = (
  mutationConfig: UseCreateEmployeeOptions = {},
) => {
  const queryClient = useQueryClient();
  const { onSuccess, ...restConfig } = mutationConfig;

  return useMutation({
    mutationFn: (newEmployee) =>
      createEmployeeUseCase(employeeRepository)(newEmployee),
    onSuccess: async (...args) => {
      await queryClient.refetchQueries({ queryKey: ['employees'] });
      toast.success('Register employee successfully');
      onSuccess?.(...args);
    },
    onError: (error) => {
      toast.error('Failed to register employee! Please comeback later!');
      console.error(error);
    },
    ...restConfig,
  });
};
