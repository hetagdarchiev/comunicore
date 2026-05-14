'use client';

import { useRouter } from 'next/navigation';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { useAuthStore } from '@/entities/session';

import {
  authLoginMutation,
  userMeOptions,
} from '@/shared/api/generated/@tanstack/react-query.gen';
import { AppRouter } from '@/shared/config/app-router';
import { PREV_PAGE } from '@/shared/lib/constants/local-storage-keys';

export const useLogin = () => {
  const queryClient = useQueryClient();

  const setStatus = useAuthStore((state) => state.actions.setStatus);

  const router = useRouter();
  const loginMutation = useMutation({
    ...authLoginMutation(),
    onMutate: () => {
      setStatus('loading');
    },
    onSuccess: (userData) => {
      setStatus('authenticated');
      const prevPage = localStorage.getItem(PREV_PAGE) || AppRouter.main;

      queryClient.setQueryData(userMeOptions().queryKey, userData);
      router.push(prevPage);

      localStorage.removeItem(PREV_PAGE);
    },
    onError: () => {
      setStatus('anonymous');
    },
  });

  return loginMutation;
};
