import { Employee } from '@/domain/entities/employee';
import { IGetEmployee } from '@/infrastructure/employees/repositories/get-by-id';

export const getEmployee =
  (employeeRepository: IGetEmployee) =>
  async (id: string): Promise<Employee> => {
    return await employeeRepository.get(id);
  };
