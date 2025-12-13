export type UpdateEmployee = {
  name: string;
  positions: UpdateEmployeePosition[];
};

type UpdateEmployeePosition = {
  id: number;
  positionResourceId: number;
  displayOrder: number;
  toolLanguages: UpdateEmployeeToolLanguage[];
};

type UpdateEmployeeToolLanguage = {
  id: number;
  toolLanguageResourceId: number;
  displayOrder: number;
  from?: number;
  to?: number;
  description?: string;
  images: UpdateImage[];
};

type UpdateImage = {
  id: number;
  data?: File;
  displayOrder: number;
};
