import { Employee } from '../../domain/entities/employee';
import { IEmployeeRepository } from '../../domain/repositories/employees.interface';

export const updateEmployee =
  (employeeRepository: Pick<IEmployeeRepository, 'update'>) =>
  async (employee: Employee): Promise<void> => {
    return await employeeRepository.update(employee);
  };
