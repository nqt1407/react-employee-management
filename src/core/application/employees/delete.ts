import { IEmployeeRepository } from '../../domain/repositories/employees.interface';

export const deleteEmployee =
  (employeeRepository: Pick<IEmployeeRepository, 'delete'>) =>
  async (id: number): Promise<void> => {
    return await employeeRepository.delete(id);
  };
