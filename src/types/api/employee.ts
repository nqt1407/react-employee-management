export type EmployeeToolLanguageImage = {
  id?: number;
  cdnUrl?: string;
  displayOrder: number;
  data?: File;
};

export type EmployeeToolLanguage = {
  id?: number;
  toolLanguageResourceId: number;
  displayOrder: number;
  from?: number;
  to?: number;
  description?: string;
  images?: EmployeeToolLanguageImage[];
};

export type EmployeePosition = {
  id?: number;
  positionResourceId: number;
  positionResourceName?: string;
  displayOrder: number;
  toolLanguages: EmployeeToolLanguage[];
};

export type Employee = {
  id?: number;
  name: string;
  positions: EmployeePosition[];
};
