import {
  QueryClient,
  DefaultError,
  UseMutationOptions,
} from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
      staleTime: 3 * 1000,
    },
  },
});

type Fn = (...args: any[]) => any;

type PromiseFn = (...args: any[]) => Promise<any>;

type ApiFnReturnType<FnType extends PromiseFn> = Awaited<ReturnType<FnType>>;

export type QueryConfig<T extends Fn> = Omit<
  ReturnType<T>,
  'queryKey' | 'queryFn'
>;

export type InfiniteQueryConfig<T extends Fn> = Omit<
  ReturnType<T>,
  'queryKey' | 'queryFn' | 'getNextPageParam' | 'initialPageParam'
>;

export type MutationConfig<MutationFnType extends PromiseFn> =
  UseMutationOptions<
    ApiFnReturnType<MutationFnType>,
    DefaultError,
    Parameters<MutationFnType>[0]
  >;
