import axios from 'axios';

import { EmployeeDTO } from '@/types/api/employee';

export const getEmployee = async (id: number): Promise<EmployeeDTO> => {
  return axios.get(`/employee/${id}`);
};
