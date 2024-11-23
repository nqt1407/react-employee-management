import { api } from '@/lib/api-client';
import {
  GetEmployeeRequest,
  GetEmployeeResponse,
} from '@/types/api/get-employees';

export const getEmployees = ({
  name,
  pageNumber,
  pageSize,
}: GetEmployeeRequest): Promise<GetEmployeeResponse> => {
  return api.get('/employees', {
    params: {
      name,
      pageNumber,
      pageSize,
    },
  });
};
