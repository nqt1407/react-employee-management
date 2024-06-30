import { useQuery } from '@tanstack/react-query';

import { getPositionResource as getPositionResourceUseCase } from '@/core/application/position/get-all-resources';
import { PositionResource } from '@/core/domain/entities/position';
import { getAllResourceRepository } from '@/core/infrastructure/position/repositories/get-all-resources-repository';
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
