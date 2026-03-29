import { renderHook, act } from '@testing-library/react';
import { vi } from 'vitest';

import { useDebounceFn } from '../use-debounce-fn';

describe('useDebounceFn', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  // ---------------------------------------------------------------------------
  // Basic trailing behaviour (default)
  // ---------------------------------------------------------------------------

  it('should not call the function immediately when run() is called', () => {
    const fn = vi.fn();
    const { result } = renderHook(() => useDebounceFn(fn));

    act(() => {
      result.current.run();
    });

    expect(fn).not.toHaveBeenCalled();
  });

  it('should call the function after the delay has elapsed', () => {
    const fn = vi.fn();
    const { result } = renderHook(() => useDebounceFn(fn, { delay: 300 }));

    act(() => {
      result.current.run('hello');
    });

    act(() => {
      vi.advanceTimersByTime(300);
    });

    expect(fn).toHaveBeenCalledTimes(1);
    expect(fn).toHaveBeenCalledWith('hello');
  });

  it('should use 500ms as the default delay', () => {
    const fn = vi.fn();
    const { result } = renderHook(() => useDebounceFn(fn));

    act(() => {
      result.current.run();
    });

    act(() => {
      vi.advanceTimersByTime(499);
    });
    expect(fn).not.toHaveBeenCalled();

    act(() => {
      vi.advanceTimersByTime(1);
    });
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('should only call the function once when run() is called multiple times within the delay', () => {
    const fn = vi.fn();
    const { result } = renderHook(() => useDebounceFn(fn, { delay: 300 }));

    act(() => {
      result.current.run('first');
      result.current.run('second');
      result.current.run('third');
    });

    act(() => {
      vi.advanceTimersByTime(300);
    });

    expect(fn).toHaveBeenCalledTimes(1);
    expect(fn).toHaveBeenCalledWith('third');
  });

  it('should reset the timer each time run() is called', () => {
    const fn = vi.fn();
    const { result } = renderHook(() => useDebounceFn(fn, { delay: 300 }));

    act(() => {
      result.current.run();
    });
    act(() => {
      vi.advanceTimersByTime(200);
    });

    // Call again — timer resets
    act(() => {
      result.current.run();
    });
    act(() => {
      vi.advanceTimersByTime(200);
    });

    // Only 200ms have passed since the last call, so fn should NOT have fired yet
    expect(fn).not.toHaveBeenCalled();

    act(() => {
      vi.advanceTimersByTime(100);
    });
    expect(fn).toHaveBeenCalledTimes(1);
  });

  // ---------------------------------------------------------------------------
  // cancel()
  // ---------------------------------------------------------------------------

  it('should not call the function after cancel()', () => {
    const fn = vi.fn();
    const { result } = renderHook(() => useDebounceFn(fn, { delay: 300 }));

    act(() => {
      result.current.run();
    });
    act(() => {
      result.current.cancel();
    });
    act(() => {
      vi.advanceTimersByTime(300);
    });

    expect(fn).not.toHaveBeenCalled();
  });

  // ---------------------------------------------------------------------------
  // flush()
  // ---------------------------------------------------------------------------

  it('should call the function immediately when flush() is invoked', () => {
    const fn = vi.fn();
    const { result } = renderHook(() => useDebounceFn(fn, { delay: 300 }));

    act(() => {
      result.current.run('pending');
    });
    act(() => {
      result.current.flush('flushed');
    });

    expect(fn).toHaveBeenCalledTimes(1);
    expect(fn).toHaveBeenCalledWith('flushed');

    // Timer should be cleared — no additional call after the delay
    act(() => {
      vi.advanceTimersByTime(300);
    });
    expect(fn).toHaveBeenCalledTimes(1);
  });

  // ---------------------------------------------------------------------------
  // Leading edge
  // ---------------------------------------------------------------------------

  it('should call the function immediately on the leading edge when leading=true', () => {
    const fn = vi.fn();
    const { result } = renderHook(() =>
      useDebounceFn(fn, { delay: 300, leading: true }),
    );

    act(() => {
      result.current.run('lead');
    });

    expect(fn).toHaveBeenCalledTimes(1);
    expect(fn).toHaveBeenCalledWith('lead');
  });

  it('should not call the function again on the trailing edge when leading=true', () => {
    const fn = vi.fn();
    const { result } = renderHook(() =>
      useDebounceFn(fn, { delay: 300, leading: true }),
    );

    act(() => {
      result.current.run('lead');
    });
    act(() => {
      vi.advanceTimersByTime(300);
    });

    // Only the leading call — no trailing call
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('should call again on the next leading edge after the delay has elapsed when leading=true', () => {
    const fn = vi.fn();
    const { result } = renderHook(() =>
      useDebounceFn(fn, { delay: 300, leading: true }),
    );

    act(() => {
      result.current.run('first');
    });
    act(() => {
      vi.advanceTimersByTime(300);
    });

    // Second burst — a new leading call should fire
    act(() => {
      result.current.run('second');
    });

    expect(fn).toHaveBeenCalledTimes(2);
    expect(fn).toHaveBeenNthCalledWith(2, 'second');
  });

  // ---------------------------------------------------------------------------
  // Always-fresh fn ref
  // ---------------------------------------------------------------------------

  it('should always call the latest version of fn without recreating the debounced wrapper', () => {
    const fn1 = vi.fn();
    const fn2 = vi.fn();

    const { result, rerender } = renderHook(({ fn }) => useDebounceFn(fn), {
      initialProps: { fn: fn1 },
    });

    act(() => {
      result.current.run();
    });

    // Swap the function before the timer fires
    rerender({ fn: fn2 });

    act(() => {
      vi.advanceTimersByTime(500);
    });

    expect(fn1).not.toHaveBeenCalled();
    expect(fn2).toHaveBeenCalledTimes(1);
  });

  // ---------------------------------------------------------------------------
  // Cleanup on unmount
  // ---------------------------------------------------------------------------

  it('should cancel the pending call when the component unmounts', () => {
    const fn = vi.fn();
    const { result, unmount } = renderHook(() =>
      useDebounceFn(fn, { delay: 300 }),
    );

    act(() => {
      result.current.run();
    });

    unmount();

    act(() => {
      vi.advanceTimersByTime(300);
    });

    expect(fn).not.toHaveBeenCalled();
  });
});
