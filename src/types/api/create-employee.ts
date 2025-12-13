export type CreateEmployee = {
  name: string;
  positions: CreateEmployeePosition[];
};

type CreateEmployeePosition = {
  positionResourceId: number;
  displayOrder: number;
  toolLanguages: CreateEmployeeToolLanguage[];
};

type CreateEmployeeToolLanguage = {
  toolLanguageResourceId: number;
  displayOrder: number;
  from?: number;
  to?: number;
  description?: string;
  images?: CreateImage[];
};

type CreateImage = {
  data?: File;
  displayOrder: number;
};
