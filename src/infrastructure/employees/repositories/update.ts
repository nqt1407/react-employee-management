import { Employee } from '@/domain/entities/employee';

import { updateEmployee } from '../api/update';

export interface IUpdateEmployeeRepository {
  update: (employee: Employee) => Promise<void>;
}

export const updateRepository = (): IUpdateEmployeeRepository => {
  return {
    update: async (employee: Employee): Promise<void> => {
      return await updateEmployee(employee.id, employee);
    },
  };
};
