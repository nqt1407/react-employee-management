import { Employee } from '@/domain/entities/employee';

import { getEmployees } from '../api/get-employees';

export interface IGetAllEmployeeRepository {
  getAll: (req: {
    search?: string;
    pageNumber?: number;
    pageSize?: number;
  }) => Promise<Employee[]>;
}

export const getAllRepository = (): IGetAllEmployeeRepository => {
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
