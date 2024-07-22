import { Employee } from '@/domain/entities/employee';
import { IGetAllEmployeeRepository } from '@/infrastructure/employees/repositories/get-all';

export const getEmployees =
  (employeeRepository: IGetAllEmployeeRepository) =>
  async (req: {
    search?: string;
    pageNumber?: number;
    pageSize?: number;
  }): Promise<Employee[]> => {
    return await employeeRepository.getAll(req);
  };
