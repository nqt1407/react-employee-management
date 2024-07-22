import axios from 'axios';

import {
  EmployeeRequestDTO,
  EmployeeResponseDTO,
} from '@/types/api/get-employees';

export const getEmployees = async ({
  search,
  pageNumber,
  pageSize,
}: EmployeeRequestDTO): Promise<EmployeeResponseDTO> => {
  let url = '/employees';

  const queryParams: string[] = [];
  if (search) {
    queryParams.push(`search=${encodeURIComponent(search)}`);
  }

  if (pageNumber) {
    queryParams.push(`pageNumber=${pageNumber}`);
  }

  if (pageSize) {
    queryParams.push(`pageSize=${pageSize}`);
  }

  if (queryParams.length > 0) {
    url += `?${queryParams.join('&')}`;
  }

  return axios.get(url);
};
