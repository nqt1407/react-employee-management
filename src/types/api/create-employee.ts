type CreateEmployeeDTO = {
  name: string;
  positions: CreateEmployeePositionDTO[];
};

type CreateEmployeePositionDTO = {
  positionResourceId: number;
  displayOrder: number;
  toolLanguages: CreateEmployeeToolLanguageDTO[];
};

type CreateEmployeeToolLanguageDTO = {
  toolLanguageResourceId: number;
  displayOrder: number;
  from?: number;
  to?: number;
  description?: string;
  images?: CreateImageDTO[];
};

type CreateImageDTO = {
  data?: File;
  displayOrder: number;
};

// * New
type CreateEmployeeRequest = {
  name: string;
  email: string;
  phone: string;
  departmentId: string;
  positionId: string;
  hireDate: string;
};

export type { CreateEmployeeDTO, CreateEmployeeRequest };
