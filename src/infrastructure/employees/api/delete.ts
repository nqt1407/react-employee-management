import { api } from '@/lib/api-client';

export const deleteEmployee = (id: number): Promise<void> => {
  return api.delete(`employee/${id}`);
};
