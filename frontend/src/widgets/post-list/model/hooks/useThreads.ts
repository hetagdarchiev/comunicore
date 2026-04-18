'use client';

import { useInfiniteQuery } from '@tanstack/react-query';

import { getThreads } from '../api/getThreads';

export function useThreads(limit: number) {
  return useInfiniteQuery({
    queryKey: ['threads'],
    initialPageParam: 1,

    queryFn: ({ pageParam }) => getThreads(pageParam, limit),

    getNextPageParam: (lastPage, allPages) => {
      if (!lastPage.haveNext) return undefined;
      return allPages.length + 1;
    },
  });
}
