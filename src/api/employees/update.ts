import axios from 'axios';
import { serialize } from 'object-to-formdata';

import { ApiResponse } from '@/types/api/response';
import { UpdateEmployee } from '@/types/api/update-employee';

export const updateEmployee = async ({
  id,
  updateReq,
}: {
  id: number;
  updateReq: UpdateEmployee;
}): Promise<ApiResponse> => {
  const formData = serialize(updateReq, {
    indices: true,
    dotsForObjectNotation: true,
  });

  const { data } = await axios.put<ApiResponse>(`/employee/${id}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return data;
};
