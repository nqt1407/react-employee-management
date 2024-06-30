import { Employee } from '../../domain/entities/employee';
import { IEmployeeRepository } from '../../domain/repositories/employees.interface';

export const createEmployee =
  (employeeRepository: Pick<IEmployeeRepository, 'save'>) =>
  async (employee: Employee): Promise<void> => {
    return await employeeRepository.save(employee);
  };
