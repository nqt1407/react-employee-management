import { Employee } from './employee';

export type EmployeeRequest = {
  search?: string;
  pageNumber?: number;
  pageSize?: number;
};

export type EmployeeResponse = {
  totalItems?: number;
  totalPages?: number;
  nextPage?: number;
  pageItems: Employee[];
};
