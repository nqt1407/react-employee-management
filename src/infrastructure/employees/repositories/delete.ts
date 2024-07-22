import { deleteEmployee } from '../api/delete';

export interface IDeleteEmployeeRepository {
  delete: (id: number) => Promise<void>;
}

export const deleteRepository = (): IDeleteEmployeeRepository => {
  return {
    delete: async (id: number): Promise<void> => {
      return await deleteEmployee(id);
    },
  };
};
