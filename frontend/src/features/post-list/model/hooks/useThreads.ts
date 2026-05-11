'use client';

import { useMemo, useRef } from 'react';

import { threadsListInfiniteOptions } from '@/shared/api/generated/@tanstack/react-query.gen';
import { useObserverInfiniteScroll } from '@/shared/hooks/useObserverInfinityScroll';
import { useInfiniteQuery } from '@tanstack/react-query';

const LIMIT_POSTS = 10;

export function useThreads() {
  const { data, hasNextPage, fetchNextPage, isFetchingNextPage, ...queries } =
    useInfiniteQuery({
      ...threadsListInfiniteOptions({
        query: { limit: LIMIT_POSTS },
      }),

      initialPageParam: 1,

      getNextPageParam: (lastPage, allPages) => {
        if (!lastPage.have_next) return undefined;

        return allPages.length + 1;
      },
    });

  const threads = useMemo(() => {
    const responseThreads = data?.pages;

    if (!responseThreads) return [];

    const allThreads = responseThreads.flatMap((page) => page?.threads ?? []);

    return allThreads.filter(
      (thread, index, self) =>
        index === self.findIndex((t) => t.id === thread.id),
    );
  }, [data?.pages]);

  const triggerRef = useRef<HTMLLIElement>(null);
  const wrapperRef = useRef<HTMLUListElement>(null);

  useObserverInfiniteScroll<HTMLElement>({
    callBack: () => {
      console.log(hasNextPage);
      if (hasNextPage) {
        console.log('triger');
        fetchNextPage();
      }
    },
    triggerRef,
    wrapperRef,
    rootMargin: '300px 0px',
    threshold: 0.5,
  });

  return {
    threads,
    hasNextPage,
    fetchNextPage,
    triggerRef,
    wrapperRef,
    isFetchingNextPage,
    ...queries,
  };
}
