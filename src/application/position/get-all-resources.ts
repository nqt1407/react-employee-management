import { PositionResource } from '@/domain/entities/position';
import { IGetAllResourcesRepository } from '@/infrastructure/position/repositories/get-all-resources';

export const getPositionResource =
  (positionRepository: IGetAllResourcesRepository) =>
  async (): Promise<PositionResource[]> => {
    return await positionRepository.getAllResources();
  };
