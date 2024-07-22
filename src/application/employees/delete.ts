import { IDeleteEmployeeRepository } from '@/infrastructure/employees/repositories/delete';

export const deleteEmployee =
  (employeeRepository: Pick<IDeleteEmployeeRepository, 'delete'>) =>
  async (id: number): Promise<void> => {
    return await employeeRepository.delete(id);
  };
