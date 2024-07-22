import { Employee } from '@/domain/entities/employee';

import { getEmployee } from '../api/get';

export interface IGetEmployee {
  get: (id: number) => Promise<Employee>;
}

export const getRepository = (): IGetEmployee => {
  return {
    get: async (id: number): Promise<Employee> => {
      const res = await getEmployee(id);
      return {
        ...res,
        positions: res.positions ?? [],
      };
    },
  };
};
