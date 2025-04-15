import { infiniteQueryOptions, useInfiniteQuery } from '@tanstack/react-query';

import { getEmployees as getEmployeesUseCase } from '@/application/employees/get-all';
import { getAllRepository } from '@/infrastructure/employees/repositories/get-all';
import { InfiniteQueryConfig } from '@/lib/react-query';

const employeeRepository = getAllRepository();

export type GetEmployeesRequest = {
  search?: string;
  pageNumber?: number;
  pageSize?: number;
};

const getInfiniteEmployeesQueryOptions = ({
  search,
  pageNumber = 1,
  pageSize = 10,
}: GetEmployeesRequest) => {
  return infiniteQueryOptions({
    initialPageParam: pageNumber,
    queryKey: ['employees', { search }],
    queryFn: async ({ pageParam = 1 }) => {
      return getEmployeesUseCase(employeeRepository)({
        search,
        pageSize,
        pageNumber: pageParam as number,
      });
    },
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length ? allPages.length + 1 : undefined;
    },
  });
};

type UseEmployeesOptions = {
  params: GetEmployeesRequest;
  queryConfig?: InfiniteQueryConfig<ReturnType<typeof getEmployeesUseCase>>;
};

export const useEmployees = ({ params, queryConfig }: UseEmployeesOptions) => {
  return useInfiniteQuery({
    ...getInfiniteEmployeesQueryOptions(params),
    ...queryConfig,
  });
};
