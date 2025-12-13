import axios from 'axios';
import { serialize } from 'object-to-formdata';

import { CreateEmployee } from '@/types/api/create-employee';
import { ApiResponse } from '@/types/api/response';

export const createEmployee = async (
  createReq: CreateEmployee,
): Promise<ApiResponse> => {
  const formData = serialize(createReq, {
    indices: true,
    dotsForObjectNotation: true,
  });

  const { data } = await axios.post<ApiResponse>('/employee', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return data;
};
