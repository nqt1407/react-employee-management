import { api } from '@/lib/api-client';
import { UpdateEmployeeRequest } from '@/types/api/update-employee';

export const updateEmployee = (
  employeeId: string,
  updateReq: UpdateEmployeeRequest,
): Promise<void> => {
  return axios.patch(`/employee/${employeeId}`, updateReq);
};
