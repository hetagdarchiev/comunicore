'use client';

import { useEffect, useRef } from 'react';

import { useAuthStore } from '@/entities/session';

import { client } from '@/shared/api/generated/client.gen';

const mePath = 'api/user/me';

export default function useInterceptor() {
  const isInitialized = useRef(false);

  useEffect(() => {
    if (isInitialized.current) return;

    const { logout, setStatus } = useAuthStore.getState().actions;

    const interceptor = client.interceptors.response.use((response) => {
      const currentStatus = useAuthStore.getState().status;
      const responseUrl = response.url;
      const isMeRequest = responseUrl.includes(mePath);

      if (isMeRequest && response.ok) {
        setStatus('authenticated');
      }

      if (response.status === 401) {
        if (currentStatus !== 'anonymous') {
          logout();
        }
      }

      return response;
    });

    isInitialized.current = true;

    return () => {
      client.interceptors.response.eject(interceptor);
      isInitialized.current = false;
    };
  }, []);
}
