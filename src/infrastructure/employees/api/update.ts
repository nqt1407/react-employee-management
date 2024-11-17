import axios from 'axios';

import { UpdateEmployeeRequest } from '@/types/api/update-employee';

export const updateEmployee = async (
  employeeId: string,
  updateReq: UpdateEmployeeRequest,
): Promise<void> => {
  return await axios.patch(`/employee/${employeeId}`, updateReq);
};
