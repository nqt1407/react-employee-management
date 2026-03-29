import { renderHook } from '@testing-library/react';
import { vi } from 'vitest';

import { useRenderCount } from '../index';

vi.mock('@/config', () => ({
  env: { DEV: false },
}));

describe('useRenderCount', () => {
  it('should return 1 on the first render', () => {
    const { result } = renderHook(() => useRenderCount());
    expect(result.current).toBe(1);
  });

  it('should increment the count on every re-render', () => {
    const { result, rerender } = renderHook(() => useRenderCount());

    expect(result.current).toBe(1);

    rerender();
    expect(result.current).toBe(2);

    rerender();
    expect(result.current).toBe(3);
  });

  it('should NOT call logger when enabled is false', () => {
    const logger = vi.fn();
    renderHook(() => useRenderCount({ enabled: false, logger }));
    expect(logger).not.toHaveBeenCalled();
  });

  it('should call logger when enabled is true', () => {
    const logger = vi.fn();
    renderHook(() => useRenderCount({ enabled: true, logger }));
    expect(logger).toHaveBeenCalledTimes(1);
  });

  it('should call logger with the correct count on each re-render', () => {
    const logger = vi.fn();
    const { rerender } = renderHook(() =>
      useRenderCount({ enabled: true, logger }),
    );

    rerender();
    rerender();

    expect(logger).toHaveBeenCalledTimes(3);
    expect(logger).toHaveBeenNthCalledWith(
      1,
      '[useRenderCount] Component rendered:',
      1,
    );
    expect(logger).toHaveBeenNthCalledWith(
      2,
      '[useRenderCount] Component rendered:',
      2,
    );
    expect(logger).toHaveBeenNthCalledWith(
      3,
      '[useRenderCount] Component rendered:',
      3,
    );
  });

  it('should use the default label "Component" in the log message', () => {
    const logger = vi.fn();
    renderHook(() => useRenderCount({ enabled: true, logger }));
    expect(logger).toHaveBeenCalledWith(
      '[useRenderCount] Component rendered:',
      1,
    );
  });

  it('should use a custom label in the log message', () => {
    const logger = vi.fn();
    renderHook(() =>
      useRenderCount({ enabled: true, label: 'MyComponent', logger }),
    );
    expect(logger).toHaveBeenCalledWith(
      '[useRenderCount] MyComponent rendered:',
      1,
    );
  });

  it('should call console.log by default when enabled is true', () => {
    const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
    renderHook(() => useRenderCount({ enabled: true }));
    expect(consoleSpy).toHaveBeenCalledWith(
      '[useRenderCount] Component rendered:',
      1,
    );
    consoleSpy.mockRestore();
  });
});
