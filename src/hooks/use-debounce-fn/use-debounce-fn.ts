import { useCallback, useEffect, useRef } from 'react';

type AnyFunction = (...args: any[]) => any;

interface UseDebounceFnOptions {
  delay?: number;
  leading?: boolean;
}

interface UseDebounceFnReturn<T extends AnyFunction> {
  /** The debounced version of the function. */
  run: (...args: Parameters<T>) => void;
  /** Cancel any pending invocation. */
  cancel: () => void;
  /** Immediately invoke the pending call (if any) and clear the timer. */
  flush: (...args: Parameters<T>) => void;
}

/**
 * Returns a debounced version of `fn` that delays its execution by `delay` ms.
 *
 * @param fn    - The function to debounce. Always refers to the latest version.
 * @param options.delay   - Debounce delay in milliseconds (default: 500).
 * @param options.leading - When `true`, invoke on the leading edge of the timeout.
 */
export const useDebounceFn = <T extends AnyFunction>(
  fn: T,
  options: UseDebounceFnOptions = {},
): UseDebounceFnReturn<T> => {
  const { delay = 500, leading = false } = options;

  // Keep a ref so the latest fn is always called without re-creating the debounced wrapper.
  const fnRef = useRef<T>(fn);
  useEffect(() => {
    fnRef.current = fn;
  }, [fn]);

  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const leadingCalledRef = useRef(false);

  const cancel = useCallback(() => {
    if (timerRef.current !== null) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    leadingCalledRef.current = false;
  }, []);

  const flush = useCallback(
    (...args: Parameters<T>) => {
      cancel();
      fnRef.current(...args);
    },
    [cancel],
  );

  const run = useCallback(
    (...args: Parameters<T>) => {
      if (leading && !leadingCalledRef.current) {
        leadingCalledRef.current = true;
        fnRef.current(...args);
      }

      if (timerRef.current !== null) {
        clearTimeout(timerRef.current);
      }

      timerRef.current = setTimeout(() => {
        timerRef.current = null;
        leadingCalledRef.current = false;
        if (!leading) {
          fnRef.current(...args);
        }
      }, delay);
    },
    [delay, leading],
  );

  // Clean up on unmount.
  useEffect(() => cancel, [cancel]);

  return { run, cancel, flush };
};
