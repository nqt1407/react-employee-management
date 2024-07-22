import axios from 'axios';

export const deleteEmployee = async (id: number): Promise<void> => {
  return await axios.delete(`employee/${id}`);
};
