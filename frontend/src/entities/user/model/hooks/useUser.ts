'use client';

import { useAuthMeQuery } from './useAuthMeQuery';

export const useUser = (options?: { enabled?: boolean }) => {
  const query = useAuthMeQuery(options);

  const user = query.data ?? null;

  return {
    user,
    ...query,
  };
};
