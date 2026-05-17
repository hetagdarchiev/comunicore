'use client';

import { useQuery } from '@tanstack/react-query';

import { userMeOptions } from '@/shared/api/generated/@tanstack/react-query.gen';

export const useAuthMeQuery = (options?: { enabled?: boolean }) => {
  const { queryKey, queryFn } = userMeOptions();
  const queries = useQuery({
    queryKey,
    queryFn,
    enabled: options?.enabled,
    retry: 0,
  });

  return queries;
};
