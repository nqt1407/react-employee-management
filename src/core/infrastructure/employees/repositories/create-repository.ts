import { Employee } from '@/core/domain/entities/employee';

import { IEmployeeRepository } from '../../../domain/repositories/employees.interface';
import { createEmployee } from '../api/create';

export const createRepository = (): Pick<IEmployeeRepository, 'save'> => {
  return {
    save: async (employee: Omit<Employee, 'id'>): Promise<void> => {
      return await createEmployee(employee);
    },
  };
};
