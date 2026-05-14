'use client';

import { useQuery } from '@tanstack/react-query';

import { userMeOptions } from '@/shared/api/generated/@tanstack/react-query.gen';

export const useAuthMeQuery = () => {
  const { queryKey, queryFn, enabled } = userMeOptions();
  const queries = useQuery({
    queryKey,
    queryFn,
    enabled,
    retry: 0,
  });

  return queries;
};
