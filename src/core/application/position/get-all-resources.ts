import { PositionResource } from '../../domain/entities/position';
import { IPositionRepository } from '../../domain/repositories/position.interface';

export const getPositionResource =
  (positionRepository: IPositionRepository) =>
  async (): Promise<PositionResource[]> => {
    return await positionRepository.getAllResources();
  };
