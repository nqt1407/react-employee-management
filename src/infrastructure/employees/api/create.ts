import axios from 'axios';

import { CreateEmployeeRequest } from '@/types/api/create-employee';

export const createEmployee = async (
  createRequest: CreateEmployeeRequest,
): Promise<void> => {
  return axios.post('/employee', createRequest);
};
