import { queryOptions, useQuery } from '@tanstack/react-query';

import { getPositionResources } from '@/api/position/get-all-resources';
import { QueryConfig } from '@/lib/react-query';

const getPositionResourcesQueryOptions = () => {
  return queryOptions({
    queryKey: ['position-resources'],
    queryFn: getPositionResources,
  });
};

type UsePositionResourcesOptions = {
  queryConfig?: QueryConfig<typeof getPositionResourcesQueryOptions>;
};

export const usePositionResources = ({
  queryConfig,
}: UsePositionResourcesOptions = {}) => {
  return useQuery({
    ...getPositionResourcesQueryOptions(),
    ...queryConfig,
  });
};
