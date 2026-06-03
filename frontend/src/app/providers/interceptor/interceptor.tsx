'use client';

import { ReactNode } from 'react';

import useInterceptor from './useInterceptor';

const InterceptorProvider = ({ children }: { children: ReactNode }) => {
  useInterceptor();

  return <>{children}</>;
};

export default InterceptorProvider;
