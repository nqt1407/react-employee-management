import {
  QueryClient,
  DefaultError,
  UseMutationOptions,
  UseInfiniteQueryOptions,
} from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});

type PromiseFn = (...args: any[]) => Promise<any>;

type ApiFnReturnType<FnType extends PromiseFn> = Awaited<ReturnType<FnType>>;

export type QueryConfig<T> = Omit<T, 'queryKey' | 'queryFn'>;

export type InfiniteQueryConfig<T> = Omit<
  UseInfiniteQueryOptions<T>,
  'queryKey' | 'queryFn'
>;

export type MutationConfig<MutationFnType extends PromiseFn> =
  UseMutationOptions<
    ApiFnReturnType<MutationFnType>,
    DefaultError,
    Parameters<MutationFnType>[0]
  >;
