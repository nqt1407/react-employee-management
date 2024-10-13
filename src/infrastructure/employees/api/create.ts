import { api } from '@/lib/api-client';
import { CreateEmployeeRequest } from '@/types/api/create-employee';

export const createEmployee = async (
  createRequest: CreateEmployeeRequest,
): Promise<void> => {
  return api.post('/employee', createRequest);
};
