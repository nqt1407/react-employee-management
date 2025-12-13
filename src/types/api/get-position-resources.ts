export type PositionResourceResponse = PositionResource[];

export type PositionResource = {
  positionResourceId: number;
  name: string;
  toolLanguageResources: ToolLanguageResource[];
};

export type ToolLanguageResource = {
  toolLanguageResourceId: number;
  positionResourceId: number;
  name: string;
};
