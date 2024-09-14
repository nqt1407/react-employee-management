import React from 'react';

import { fastShallowEqual } from '../object';

export const memoWithGeneric = React.memo as <P extends object>(
  Component: (props: P) => ReturnType<React.FunctionComponent>,
  propsAreEqual?: (prevProps: Readonly<P>, nextProps: Readonly<P>) => boolean,
) => (props: P) => ReturnType<React.FunctionComponent>;

export const fastMemo = <T>(component: T): T => {
  return memoWithGeneric(component as any, fastShallowEqual) as unknown as T;
};
