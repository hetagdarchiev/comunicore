'use client';

import { ReactNode } from 'react';

import useInterceptor from './useInterceptor';

import { useAuthMeQuery } from '@/entities/user';

const InterceptorProvider = ({ children }: { children: ReactNode }) => {
  useInterceptor();
  useAuthMeQuery({ enabled: true });

  return <>{children}</>;
};

export default InterceptorProvider;
