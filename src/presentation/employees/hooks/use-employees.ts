import { queryOptions, useQuery } from '@tanstack/react-query';

import { getEmployees as getEmployeesUseCase } from '@/application/employees/get-all';
import { getAllRepository } from '@/infrastructure/employees/repositories/get-all';
import { QueryConfig } from '@/lib/react-query';
import { Employee } from '@/types/api/employee';
import { GetEmployeeRequest } from '@/types/api/get-employees';

const employeeRepository = getAllRepository();

type UseEmployeesOptions = GetEmployeeRequest & {
  queryConfig?: QueryConfig<Employee[]>;
};

export const getEmployeesQueryOptions = (
  name?: string,
  pageNumber: number = 1,
  pageSize: number = 10,
) => {
  return queryOptions({
    queryKey: [
      'employees',
      {
        ...(name && { name }),
        pageNumber,
        pageSize,
      },
    ],
    queryFn: () =>
      getEmployeesUseCase(employeeRepository)({
        name,
        pageNumber,
        pageSize,
      }),
  });
};

export const useEmployees = ({
  queryConfig,
  name,
  pageNumber,
  pageSize,
}: UseEmployeesOptions = {}) => {
  return useQuery({
    ...getEmployeesQueryOptions(name, pageNumber, pageSize),
    ...queryConfig,
  });
};
