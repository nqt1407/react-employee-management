import { Employee } from '../../domain/entities/employee';
import { IEmployeeRepository } from '../../domain/repositories/employees.interface';

export const getEmployees =
  (employeeRepository: Pick<IEmployeeRepository, 'getAll'>) =>
  async (req: {
    search?: string;
    pageNumber?: number;
    pageSize?: number;
  }): Promise<Employee[]> => {
    return await employeeRepository.getAll(req);
  };
