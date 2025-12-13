import { infiniteQueryOptions, useInfiniteQuery } from '@tanstack/react-query';

import { getEmployees } from '@/api/employees/get';
import { InfiniteQueryConfig } from '@/lib/react-query';

export type GetEmployeesRequest = {
  search?: string;
  pageNumber?: number;
  pageSize?: number;
};

export const getInfiniteEmployeesQueryOptions = ({
  search,
}: GetEmployeesRequest) => {
  return infiniteQueryOptions({
    initialPageParam: 1,
    queryKey: ['employees', { search }] as const,
    queryFn: ({ pageParam = 1 }) =>
      getEmployees({
        search,
        pageSize: 10,
        pageNumber: pageParam as number,
      }),
    getNextPageParam: (lastPage) => {
      if (!lastPage || lastPage.nextPage === lastPage.totalPages)
        return undefined;
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
