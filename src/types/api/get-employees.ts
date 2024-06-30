import { EmployeeDTO } from './employee';

type EmployeeRequestDTO = {
  search?: string;
  pageNumber?: number;
  pageSize?: number;
};

type EmployeeResponseDTO = {
  totalItems?: number;
  totalPages?: number;
  nextPage?: number;
  pageItems: EmployeeDTO[];
};

export type { EmployeeRequestDTO, EmployeeResponseDTO };
