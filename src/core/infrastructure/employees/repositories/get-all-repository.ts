import { Employee } from '../../../domain/entities/employee';
import { IEmployeeRepository } from '../../../domain/repositories/employees.interface';
import { getEmployees } from '../api/get-employees';

export const getAllRepository = (): Pick<IEmployeeRepository, 'getAll'> => {
  return {
    getAll: async (req: {
      search?: string;
      pageNumber?: number;
      pageSize?: number;
    }): Promise<Employee[]> => {
      const res = await getEmployees(req);
      if (!res.pageItems) {
        return [];
      }
      const employees: Employee[] = [];

      for (const { id, name, positions = [] } of res.pageItems) {
        employees.push({
          id,
          name,
          positions,
        });
      }

      return employees;
    },
  };
};
