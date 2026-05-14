'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { useAuthStore } from '../store/auth.store';

import {
  authLogoutMutation,
  userMeQueryKey,
} from '@/shared/api/generated/@tanstack/react-query.gen';

export const useLogoutMutation = () => {
  const queryClient = useQueryClient();
  const authActions = useAuthStore((s) => s.actions);

  return useMutation<void, Error, void>({
    ...authLogoutMutation,
    onSuccess: () => {
      authActions.logout();

      queryClient.removeQueries({ queryKey: userMeQueryKey() });
    },
  });
};
