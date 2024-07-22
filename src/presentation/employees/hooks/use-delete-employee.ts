import { useMutation, useQueryClient } from '@tanstack/react-query';
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
  const queryClient = useQueryClient();
  const { onSuccess, ...restConfig } = mutationConfig;

  return useMutation({
    mutationFn: (id) => deleteEmployeeUseCase(employeeRepository)(id),
    onSuccess: async (...args) => {
      await queryClient.refetchQueries({ queryKey: ['employees'] });
      toast.success('Delete employee successfully');
      onSuccess?.(...args);
    },
    onError: (error) => {
      toast.error('Failed to delete employee! Please comeback later!');
      console.error(error);
    },
    ...restConfig,
  });
};
