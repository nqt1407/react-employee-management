import { PositionResource } from '../../../domain/entities/position';
import { IPositionRepository } from '../../../domain/repositories/position.interface';
import { getPositionResources } from '../api/get-all-resources';

export const getAllResourceRepository = (): Pick<
  IPositionRepository,
  'getAllResources'
> => {
  return {
    getAllResources: async (): Promise<PositionResource[]> => {
      return await getPositionResources();
    },
  };
};
