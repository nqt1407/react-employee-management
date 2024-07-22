import { useInfiniteQuery } from '@tanstack/react-query';

import { getEmployees as getEmployeesUseCase } from '@/application/employees/get-all';
import { Employee } from '@/domain/entities/employee';
import { getAllRepository } from '@/infrastructure/employees/repositories/get-all';
import { QueryConfig } from '@/lib/react-query';

const employeeRepository = getAllRepository();

export type GetEmployeesRequest = {
  search?: string;
  pageNumber?: number;
  pageSize?: number;
};

type UseEmployeesOptions = {
  search?: string;
  pagination?: Omit<GetEmployeesRequest, 'search'>;
  queryConfig?: QueryConfig<Employee[]>;
};

const useEmployees = ({
  search,
  pagination = { pageNumber: 1, pageSize: 10 },
  queryConfig,
}: UseEmployeesOptions) => {
  return useInfiniteQuery<Employee[]>({
    initialPageParam: pagination.pageNumber,
    queryKey: ['employees', { search, ...pagination }],
    queryFn: async ({ pageParam = pagination.pageNumber }) => {
      return getEmployeesUseCase(employeeRepository)({
        search,
        pageNumber: pageParam as number,
        pageSize: pagination.pageSize,
      });
    },
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length ? allPages.length + 1 : undefined;
    },
    ...queryConfig,
  });
};

export { useEmployees };
