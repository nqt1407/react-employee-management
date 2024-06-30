import { PositionResource } from '../entities/position';

export interface IPositionRepository {
  getAllResources: () => Promise<PositionResource[]>;
}
