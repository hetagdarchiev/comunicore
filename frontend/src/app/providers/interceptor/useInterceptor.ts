'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { useAuthStore } from '@/entities/session';

import { client } from '@/shared/api/generated/client.gen';

export default function useInterceptor() {
  const router = useRouter();
  const logout = useAuthStore((s) => s.actions.logout);
  const setAuthState = useAuthStore((state) => state.actions.setStatus);

  useEffect(() => {
    const interceptor = client.interceptors.response.use((response) => {
      if (response.status === 401) {
        logout();
      }
      setAuthState('authenticated');
      return response;
    });

    return () => {
      client.interceptors.response.eject(interceptor);
    };
  }, [logout, router, setAuthState]);
}
