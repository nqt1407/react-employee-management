import { Employee } from '@/core/domain/entities/employee';

import { IEmployeeRepository } from '../../../domain/repositories/employees.interface';
import { updateEmployee } from '../api/update';

export const updateRepository = (): Pick<IEmployeeRepository, 'update'> => {
  return {
    update: async (employee: Employee): Promise<void> => {
      if (!employee.id || isNaN(employee.id))
        throw new Error('Employee id is not correct');

      return await updateEmployee(employee.id, employee as any);
    },
  };
};
