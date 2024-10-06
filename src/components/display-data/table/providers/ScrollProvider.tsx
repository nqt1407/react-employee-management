import { VirtualItem, useVirtualizer } from '@tanstack/react-virtual';
import React, { useContext, useMemo, useCallback, useRef } from 'react';

import { useTableRootProps } from './TableProvider';

type ScrollProvideProps = {
  children: React.ReactNode;
};

const VirtualContext = React.createContext<
  { getVirtualData: () => VirtualItem[]; getTotalSize: () => void } | undefined
>(undefined);

export const ScrollProvider = ({ children }: ScrollProvideProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { data, virtual, scroll, onScroll } = useTableRootProps();

  const virtualizerOptions = useMemo(
    () => ({
      ...virtual,
      estimateSize: virtual?.estimateSize ? virtual.estimateSize : () => 34,
      count: virtual?.count ?? data.length,
      getScrollElement: () => containerRef.current,
      enabled: !!virtual,
    }),
    [data.length, virtual],
  );

  const { getVirtualItems, getTotalSize } = useVirtualizer(virtualizerOptions);

  const scrollYStyle = useMemo<React.CSSProperties | undefined>(() => {
    if (scroll?.y) {
      return {
        overflowY: 'auto',
        maxHeight: scroll.y,
        scrollBehavior: 'smooth',
      };
    }
    return;
  }, [scroll]);

  const getVirtualData = useCallback(
    () => getVirtualItems(),
    [getVirtualItems],
  );

  const getTotalDataSize = useCallback(() => getTotalSize(), [getTotalSize]);

  return (
    <VirtualContext.Provider
      value={{ getVirtualData, getTotalSize: getTotalDataSize }}
    >
      <div
        className="relative w-full overflow-auto"
        style={scrollYStyle}
        ref={containerRef}
        onScroll={onScroll}
      >
        {children}
      </div>
    </VirtualContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useVirtual = () => {
  const context = useContext(VirtualContext);
  if (!context) {
    throw new Error('useVirtual must be used within a ScrollProvider');
  }
  return context;
};
