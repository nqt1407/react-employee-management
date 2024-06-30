import { StoreApi } from 'zustand';
import { useStoreWithEqualityFn } from 'zustand/traditional';

type ExtractState<S> = S extends {
  getState: () => infer T;
}
  ? T
  : never;

type Params<
  U,
  T extends StoreApi<unknown> & {
    getServerState?: (() => unknown) | undefined;
  },
> = Parameters<typeof useStoreWithEqualityFn<T, U>>;

export type { ExtractState, Params };
