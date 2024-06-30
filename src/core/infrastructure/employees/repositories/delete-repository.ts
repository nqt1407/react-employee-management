import { IEmployeeRepository } from '../../../domain/repositories/employees.interface';
import { deleteEmployee } from '../api/delete';

export const deleteRepository = (): Pick<IEmployeeRepository, 'delete'> => {
  return {
    delete: async (id: number): Promise<void> => {
      return await deleteEmployee(id);
    },
  };
};
