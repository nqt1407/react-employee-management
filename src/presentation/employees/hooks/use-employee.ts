import { useQuery, queryOptions } from '@tanstack/react-query';

import { getEmployee as getEmployeeUseCase } from '@/application/employees/get-by-id';
import { getRepository } from '@/infrastructure/employees/repositories/get-by-id';
import { QueryConfig } from '@/lib/react-query';

const employeeRepository = getRepository();

const getEmployeeQueryOptions = (employeeId: number) => {
  return queryOptions({
    queryKey: ['employee', employeeId],
    queryFn: () => getEmployeeUseCase(employeeRepository)(employeeId),
  });
};

type UseEmployeeOptions = {
  employeeId: number;
  queryConfig?: QueryConfig<ReturnType<typeof getEmployeeUseCase>>;
};

const useEmployee = ({ employeeId, queryConfig }: UseEmployeeOptions) => {
  return useQuery({
    ...getEmployeeQueryOptions(employeeId),
    ...queryConfig,
  });
};

export { getEmployeeQueryOptions, useEmployee };
