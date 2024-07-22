import { useQuery } from '@tanstack/react-query';

import { getPositionResource as getPositionResourceUseCase } from '@/application/position/get-all-resources';
import { PositionResource } from '@/domain/entities/position';
import { getAllResourceRepository } from '@/infrastructure/position/repositories/get-all-resources';
import { QueryConfig } from '@/lib/react-query';

type UsePositionResourcesOptions = QueryConfig<PositionResource[]>;

const positionRepository = getAllResourceRepository();

export const usePositionResources = (
  queryConfig?: UsePositionResourcesOptions,
) => {
  return useQuery({
    queryKey: ['position', 'resources'],
    queryFn: () => getPositionResourceUseCase(positionRepository)(),
    ...queryConfig,
  });
};
