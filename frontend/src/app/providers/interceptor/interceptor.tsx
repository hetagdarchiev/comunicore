'use client';

import { ReactNode, useEffect } from 'react';

import useInterceptor from './useInterceptor';

import { useAuthStore } from '@/entities/session';
import { useAuthMeQuery } from '@/entities/user';

const InterceptorProvider = ({ children }: { children: ReactNode }) => {
  useInterceptor();

  const status = useAuthStore((state) => state.status);
  const { logout } = useAuthStore.getState().actions;

  const isEnabled = status === 'loading' || status === 'authenticated';

  const { error, isError } = useAuthMeQuery({
    enabled: isEnabled,
  });

  useEffect(() => {
    if (isError && error) {
      logout();
    }
  }, [isError, error, logout]);

  return <>{children}</>;
};

export default InterceptorProvider;
