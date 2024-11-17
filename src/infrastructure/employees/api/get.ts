import axios from 'axios';

import { Employee } from '@/types/api/employee';

export const getEmployee = async (id: string): Promise<Employee> => {
  return axios.get(`/employee/${id}`);
};
