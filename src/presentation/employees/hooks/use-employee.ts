import { useQuery, queryOptions } from '@tanstack/react-query';

import { getEmployee as getEmployeeUseCase } from '@/core/application/employees/get';
import { Employee } from '@/core/domain/entities/employee';
import { getRepository } from '@/core/infrastructure/employees/repositories/get-repository';
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
  queryConfig?: QueryConfig<Employee>;
};

const useEmployee = ({ employeeId, queryConfig }: UseEmployeeOptions) => {
  return useQuery({
    ...getEmployeeQueryOptions(employeeId),
    ...queryConfig,
  });
};

export { getEmployeeQueryOptions, useEmployee };
