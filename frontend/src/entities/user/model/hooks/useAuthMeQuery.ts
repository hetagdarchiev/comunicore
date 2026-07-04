'use client';

import { useQuery } from '@tanstack/react-query';

import { mockUser } from '../data/mock-user';

import { userMeOptions } from '@/shared/api/generated/@tanstack/react-query.gen';

export const useAuthMeQuery = (options?: { enabled?: boolean }) => {
  const { queryKey } = userMeOptions();
  const queries = useQuery({
    queryKey,
    queryFn: async () => mockUser,
    enabled: options?.enabled,
    retry: 0,
  });

  return queries;
};
