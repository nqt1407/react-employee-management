import { PositionResource } from '@/domain/entities/position';

import { getPositionResources } from '../api/get-all-resources';

export interface IGetAllResourcesRepository {
  getAllResources: () => Promise<PositionResource[]>;
}

export const getAllResourceRepository = (): IGetAllResourcesRepository => {
  return {
    getAllResources: async (): Promise<PositionResource[]> => {
      return await getPositionResources();
    },
  };
};
