'use client';

import { useMemo } from 'react';
import { useRouter } from 'next/navigation';

import { useQuery, useQueryClient } from '@tanstack/react-query';

import { userMeOptions } from '../api/generated/@tanstack/react-query.gen';

export function useAuth() {
  const queryClient = useQueryClient();
  const router = useRouter();

  const token =
    typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;

  // Запрос данных профиля
  const {
    data: user,
    isLoading,
    isError,
    error,
  } = useQuery({
    ...userMeOptions(),
    enabled: !!token,
    retry: false,
    staleTime: 1000 * 60 * 5, // 5 минут не переспрашивать сервер
  });

  // Выход из профиля
  const logout = () => {
    localStorage.removeItem('accessToken');
    queryClient.clear();
    router.push('/login');
    router.refresh();
  };

  return {
    user,
    isAuthenticated: !!user,
    isLoading: !!token && isLoading,
    isError,
    error,
    logout,
  };
}
