import { queryOptions, useQuery } from '@tanstack/react-query';

import { getPositionResource as getPositionResourceUseCase } from '@/application/position/get-all-resources';
import { getAllResourceRepository } from '@/infrastructure/position/repositories/get-all-resources';
import { QueryConfig } from '@/lib/react-query';

type UsePositionResourcesOptions = QueryConfig<
  ReturnType<typeof getPositionResourceUseCase>
>;

const positionRepository = getAllResourceRepository();

const getPositionResourcesQueryOptions = () => {
  return queryOptions({
    queryKey: ['position-resources'],
    queryFn: () => getPositionResourceUseCase(positionRepository)(),
  });
};

export const usePositionResources = (
  queryConfig?: UsePositionResourcesOptions,
) => {
  return useQuery({
    ...getPositionResourcesQueryOptions(),
    ...queryConfig,
  });
};
