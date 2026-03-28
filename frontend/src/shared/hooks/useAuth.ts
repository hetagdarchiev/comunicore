'use client';

import { useMemo } from 'react';
import { useRouter } from 'next/navigation';

import { useQuery, useQueryClient } from '@tanstack/react-query';

import { userMeOptions } from '../api/generated/@tanstack/react-query.gen';

export function useAuth() {
  const queryClient = useQueryClient();
  const router = useRouter();

  // 1. Извлекаем токен
  const token = useMemo(() => {
    if (typeof window === 'undefined') return null;
    const t = localStorage.getItem('accessToken');
    console.log(
      '🔑 [useAuth] Проверка токена в Storage:',
      t ? 'Найдено' : 'Пусто',
    );
    return t;
  }, []);

  // 2. Запрос данных профиля
  const {
    data: user,
    isLoading,
    isError,
    error,
  } = useQuery({
    ...userMeOptions(),
    enabled: !!token, // Запрос не уйдет, если нет токена
    retry: false,
    staleTime: 1000 * 60 * 5, // 5 минут не переспрашивать сервер
  });

  // Логируем результат запроса профиля
  if (user) console.log('👤 [useAuth] Данные пользователя получены:', user);
  if (isError) console.error('❌ [useAuth] Ошибка загрузки профиля:', error);

  const logout = () => {
    console.log('🚪 [useAuth] Выход из системы...');
    localStorage.removeItem('accessToken');
    queryClient.clear();
    router.push('/login');
    router.refresh();
  };

  return {
    user,
    isAuthenticated: !!user,
    isLoading: !!token && isLoading,
    isReady: typeof window !== 'undefined',
    logout,
  };
}
