import axios from 'axios';

import { Employee } from '@/types/api/employee';
import { EmployeeRequest, EmployeeResponse } from '@/types/api/get-employees';

export const getEmployee = async (id: number) => {
  const { data } = await axios.get<Employee>(`/employee/${id}`);
  return data;
};

export const getEmployees = async ({
  pageNumber,
  pageSize,
  search,
}: EmployeeRequest) => {
  const params = new URLSearchParams();
  if (pageNumber) params.append('pageNumber', pageNumber.toString());
  if (pageSize) params.append('pageSize', pageSize.toString());
  if (search) params.append('search', search);

  const url = `/employees?${params.toString()}`;
  const res = await axios.get<EmployeeResponse>(url);
  return res.data;
};
