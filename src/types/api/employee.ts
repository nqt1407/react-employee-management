type EmployeeToolLanguageImageDTO = {
  id?: number;
  cdnUrl: string;
  displayOrder: number;
  data?: File;
};

type EmployeeToolLanguageDTO = {
  id: number;
  toolLanguageResourceId: number;
  displayOrder: number;
  from?: number;
  to?: number;
  description?: string;
  images?: EmployeeToolLanguageImageDTO[];
};

type EmployeePositionDTO = {
  id: number;
  positionResourceId: number;
  displayOrder: number;
  toolLanguages: EmployeeToolLanguageDTO[];
};

type EmployeeDTO = {
  id: number;
  name: string;
  positions?: EmployeePositionDTO[];
};

type Employee = {
  id: string;
  name: string;
  email: string;
  phone: string;
  department: string;
  position: string;
  hireDate: string;
};

export type {
  EmployeeDTO,
  EmployeePositionDTO,
  EmployeeToolLanguageDTO,
  EmployeeToolLanguageImageDTO,
  Employee,
};
