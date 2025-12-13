import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

import { createEmployee as createEmployeeApi } from '@/api/employees/create';
import { MutationConfig } from '@/lib/react-query';

type createEmployee = typeof createEmployeeApi;

type UseCreateEmployeeOptions = MutationConfig<createEmployee>;

export const useCreateEmployee = (
  mutationConfig: UseCreateEmployeeOptions = {},
) => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const { onSuccess, ...restConfig } = mutationConfig;

  return useMutation({
    mutationFn: createEmployeeApi,
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
