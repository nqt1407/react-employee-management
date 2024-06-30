type PositionResourceResponse = PositionResourceDTO[];

type PositionResourceDTO = {
  positionResourceId: number;
  name: string;
  toolLanguageResources: ToolLanguageResourcesDTO[];
};

type ToolLanguageResourcesDTO = {
  toolLanguageResourceId: number;
  positionResourceId: number;
  name: string;
};

export type { PositionResourceResponse };
