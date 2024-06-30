import axios from 'axios';
import { serialize } from 'object-to-formdata';

import { CreateEmployeeDTO } from '@/types/api/create-employee';

export const createEmployee = async (
  createReq: CreateEmployeeDTO,
): Promise<void> => {
  const formData = serialize(createReq, {
    indices: true,
    dotsForObjectNotation: true,
  });

  return await axios.post('/employee', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};
