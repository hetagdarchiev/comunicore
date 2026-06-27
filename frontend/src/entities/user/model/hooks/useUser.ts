'use client';

import { useAuthMeQuery } from './useAuthMeQuery';

export const useUser = (options?: { enabled?: boolean }) => {
  const { data, ...query } = useAuthMeQuery(options);

  const user = data ?? null;

  return {
    user,
    ...query,
  };
};
