import { api } from '@/lib/api-client';
import { Employee } from '@/types/api/employee';

export const getEmployee = (id: string): Promise<Employee> => {
  return api.get(`/employee/${id}`);
};
