import axios from 'axios';

import { ApiResponse } from '@/types/api/response';

export const deleteEmployee = async (id: number): Promise<ApiResponse> => {
  const { data } = await axios.delete<ApiResponse>(`employee/${id}`);
  return data;
};
