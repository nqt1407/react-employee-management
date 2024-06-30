import { Employee } from '../entities/employee';

export interface IEmployeeRepository {
  getAll: (req: {
    search?: string;
    pageNumber?: number;
    pageSize?: number;
  }) => Promise<Employee[]>;
  save: (employee: Omit<Employee, 'id'>) => Promise<void>;
  delete: (id: number) => Promise<void>;
  get: (id: number) => Promise<Employee>;
  update: (employee: Employee) => Promise<void>;
}
