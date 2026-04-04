'use client';

import { useRouter } from 'next/navigation';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import {
  authLogoutMutation,
  userMeOptions,
} from '../api/generated/@tanstack/react-query.gen';

export function useAuth() {
  const queryClient = useQueryClient();
  const router = useRouter();

  const {
    data: user,
    isLoading,
    isError,
  } = useQuery({
    ...userMeOptions(),
    retry: false,
    staleTime: 1000 * 60 * 5,
  });

  const { mutate: mutateLogout } = useMutation({
    ...authLogoutMutation(),
    onSuccess: () => {
      queryClient.clear();
      router.push('/login');
      router.refresh();
    },
    onError: (error) => {
      console.error('Ошибка при выходе:', error);
      queryClient.clear();
      router.push('/login');
    },
  });

  const logout = () => {
    mutateLogout({});
  };

  return {
    user,
    isAuthenticated: !!user && !isError,
    isLoading,
    logout,
  };
}
