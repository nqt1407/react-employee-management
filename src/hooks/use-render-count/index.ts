import { useRef } from 'react';

import { env } from '@/config';

interface RenderCountOptions {
  label?: string;
  enabled?: boolean;
  logger?: (message: string, count: number) => void;
}

export const useRenderCount = (options: RenderCountOptions = {}): number => {
  const {
    label = 'Component',
    enabled = env.DEV,
    logger = (message, count) => console.log(message, count),
  } = options;

  const renderCount = useRef(0);
  ++renderCount.current;

  if (enabled)
    logger(`[useRenderCount] ${label} rendered:`, renderCount.current);

  return renderCount.current;
};
