type UpdateEmployeeDTO = {
  name: string;
  positions: UpdateEmployeePositionDTO[];
};

type UpdateEmployeePositionDTO = {
  id: number;
  positionResourceId: number;
  displayOrder: number;
  toolLanguages: UpdateEmployeeToolLanguageDTO[];
};

type UpdateEmployeeToolLanguageDTO = {
  id: number;
  toolLanguageResourceId: number;
  displayOrder: number;
  from?: number;
  to?: number;
  description?: string;
  images: UpdateImageDTO[];
};

type UpdateImageDTO = {
  id: number;
  data: File;
  displayOrder: number;
};

export type { UpdateEmployeeDTO };
