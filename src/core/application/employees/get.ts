import { Employee } from '../../domain/entities/employee';
import { IEmployeeRepository } from '../../domain/repositories/employees.interface';

export const getEmployee =
  (employeeRepository: Pick<IEmployeeRepository, 'get'>) =>
  async (id: number): Promise<Employee> => {
    return await employeeRepository.get(id);
  };
