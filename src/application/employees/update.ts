import { Employee } from '@/domain/entities/employee';
import { IUpdateEmployeeRepository } from '@/infrastructure/employees/repositories/update';

export const updateEmployee =
  (employeeRepository: IUpdateEmployeeRepository) =>
  async (employee: Employee): Promise<void> => {
    return await employeeRepository.update(employee);
  };
