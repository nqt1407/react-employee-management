import { Employee } from './employee';

type GetEmployeeRequest = {
  name?: string;
  pageNumber?: number;
  pageSize?: number;
};

type GetEmployeeResponse = {
  totalItems?: number;
  totalPages?: number;
  nextPage?: number;
  items: Employee[];
};

export type { GetEmployeeRequest, GetEmployeeResponse };
