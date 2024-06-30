interface EmployeeToolLanguage {
  id?: number;
  toolLanguageResourceId: number;
  displayOrder: number;
  from?: number;
  to?: number;
  description?: string;
  images?: Image[];
}

interface Image {
  id?: number;
  cdnUrl?: string;
  data: File;
  displayOrder: number;
}

interface EmployeePosition {
  id?: number;
  positionResourceId: number;
  displayOrder: number;
  toolLanguages: EmployeeToolLanguage[];
}

interface Employee {
  id?: number;
  name: string;
  positions: EmployeePosition[];
}

export type { Employee, EmployeePosition };
