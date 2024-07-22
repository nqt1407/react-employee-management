import { Employee } from '@/domain/entities/employee';

import { updateEmployee } from '../api/update';

export interface IUpdateEmployeeRepository {
  update: (employee: Employee) => Promise<void>;
}

export const updateRepository = (): IUpdateEmployeeRepository => {
  return {
    update: async (employee: Employee): Promise<void> => {
      if (!employee.id || isNaN(employee.id))
        throw new Error('Employee id is not correct');

      return await updateEmployee(employee.id, employee as any);
    },
  };
};
