'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { useAuthStore } from '@/entities/session';

import {
  authLoginMutation,
  userMeOptions,
} from '@/shared/api/generated/@tanstack/react-query.gen';

export const useLogin = () => {
  const queryClient = useQueryClient();

  const setStatus = useAuthStore((state) => state.actions.setStatus);

  const loginMutation = useMutation({
    ...authLoginMutation(),
    onMutate: () => {
      setStatus('loading');
    },
    onSuccess: (userData) => {
      setStatus('authenticated');

      queryClient.setQueryData(userMeOptions().queryKey, userData);
    },
    onError: () => {
      setStatus('anonymous');
    },
  });

  return loginMutation;
};
