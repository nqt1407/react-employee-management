import { Employee } from '@/domain/entities/employee';
import { ICreateEmployeeRepository } from '@/infrastructure/employees/repositories/create';

export const createEmployee =
  (employeeRepository: ICreateEmployeeRepository) =>
  async (employee: Employee): Promise<void> => {
    return await employeeRepository.save(employee);
  };
