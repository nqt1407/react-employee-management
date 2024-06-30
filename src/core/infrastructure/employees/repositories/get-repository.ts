import { Employee } from '../../../domain/entities/employee';
import { IEmployeeRepository } from '../../../domain/repositories/employees.interface';
import { getEmployee } from '../api/get';

export const getRepository = (): Pick<IEmployeeRepository, 'get'> => {
  return {
    get: async (id: number): Promise<Employee> => {
      const res = await getEmployee(id);
      return {
        ...res,
        positions: res.positions ?? [],
      };
    },
  };
};
