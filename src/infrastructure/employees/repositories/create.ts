import { Employee } from '@/domain/entities/employee';

import { createEmployee } from '../api/create';

export interface ICreateEmployeeRepository {
  save: (employee: Omit<Employee, 'id'>) => Promise<void>;
}

export const createRepository = (): ICreateEmployeeRepository => {
  return {
    save: async (employee: Omit<Employee, 'id'>): Promise<void> => {
      return await createEmployee(employee);
    },
  };
};
