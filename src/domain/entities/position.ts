interface ToolLanguageResource {
  toolLanguageResourceId: number;
  positionResourceId: number;
  name: string;
}

interface PositionResource {
  positionResourceId: number;
  name: string;
  toolLanguageResources: ToolLanguageResource[];
}

export type { ToolLanguageResource, PositionResource };
