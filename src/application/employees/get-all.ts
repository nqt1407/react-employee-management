import { IGetAllEmployeeRepository } from '@/infrastructure/employees/repositories/get-all';

export const getEmployees =
  (employeeRepository: IGetAllEmployeeRepository) =>
  async (req: { name?: string; pageNumber?: number; pageSize?: number }) => {
    return await employeeRepository.getAll(req);
  };
