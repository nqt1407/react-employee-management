import { useQuery, queryOptions } from '@tanstack/react-query';

import { getEmployee as getEmployeeApi } from '@/api/employees/get';
import { QueryConfig } from '@/lib/react-query';

const getEmployeeQueryOptions = (employeeId: number) => {
  return queryOptions({
    queryKey: ['employee', employeeId],
    queryFn: () => getEmployeeApi(employeeId),
  });
};

type UseEmployeeOptions = {
  employeeId: number;
  queryConfig?: QueryConfig<typeof getEmployeeApi>;
};

const useEmployee = ({ employeeId, queryConfig }: UseEmployeeOptions) => {
  return useQuery({
    ...getEmployeeQueryOptions(employeeId),
    ...queryConfig,
  });
};

export { getEmployeeQueryOptions, useEmployee };
