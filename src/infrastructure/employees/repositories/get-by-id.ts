import { Employee } from '@/domain/entities/employee';

import { getEmployee } from '../api/get';

export interface IGetEmployee {
  get: (id: string) => Promise<Employee>;
}

export const getRepository = (): IGetEmployee => {
  return {
    get: (id: string): Promise<Employee> => getEmployee(id),
  };
};
