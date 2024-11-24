import { api } from '@/lib/api-client';
import { UpdateEmployeeRequest } from '@/types/api/update-employee';

export const updateEmployee = (
  employeeId: string,
  updateReq: UpdateEmployeeRequest,
): Promise<void> => {
  return api.patch(`/employee/${employeeId}`, updateReq);
};
