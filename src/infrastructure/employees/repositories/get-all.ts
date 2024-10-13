import { getEmployees } from '../api/get-employees';

export interface IGetAllEmployeeRepository {
  getAll: (req: {
    search?: string;
    pageNumber?: number;
    pageSize?: number;
  }) => ReturnType<typeof getEmployees>;
}

export const getAllRepository = (): IGetAllEmployeeRepository => {
  return {
    getAll: async (req: {
      search?: string;
      pageNumber?: number;
      pageSize?: number;
    }): ReturnType<typeof getEmployees> => {
      return await getEmployees(req);
    },
  };
};
