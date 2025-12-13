import { infiniteQueryOptions, useInfiniteQuery } from '@tanstack/react-query';

import { getEmployees } from '@/api/employees/get';
import { InfiniteQueryConfig } from '@/lib/react-query';

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
    queryKey: ['employees', { search }] as const,
    queryFn: ({ pageParam = 1 }) =>
      getEmployees({
        search,
        pageSize,
        pageNumber: pageParam as number,
      }),
    getNextPageParam: (lastPage) => {
      return lastPage.nextPage;
    },
  });
};

type UseEmployeesOptions = {
  params: GetEmployeesRequest;
  queryConfig?: InfiniteQueryConfig<typeof getInfiniteEmployeesQueryOptions>;
};

export const useEmployees = ({ params, queryConfig }: UseEmployeesOptions) => {
  return useInfiniteQuery({
    ...getInfiniteEmployeesQueryOptions(params),
    ...queryConfig,
  });
};
