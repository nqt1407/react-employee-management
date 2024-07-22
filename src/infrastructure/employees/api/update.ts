import axios from 'axios';
import { serialize } from 'object-to-formdata';

import { UpdateEmployeeDTO } from '@/types/api/update-employee';

export const updateEmployee = async (
  employeeId: number,
  updateReq: UpdateEmployeeDTO,
): Promise<void> => {
  const formData = serialize(updateReq, {
    indices: true,
    dotsForObjectNotation: true,
  });

  return await axios.put(`/employee/${employeeId}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};
