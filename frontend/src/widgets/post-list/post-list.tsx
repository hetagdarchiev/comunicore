/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useCallback, useRef } from 'react';

import { PostCard } from '@/entities/post';
import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';

import { Sorting } from './sorting';

type Thread = {
  id: number;
  title: string;
  content: string;
  author_id: number;
  author_name: string;
  posts_count: number;
  created_at: string;
};

type Response = {
  threads: Thread[];
  have_next: boolean;
};

export function PostList() {
  const queryClient = useQueryClient();
  const postCount = 4;

  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery<Response>({
    queryKey: ['threads'],
    initialPageParam: 1,
    queryFn: async ({ pageParam }) => {
      const res = await fetch(
        `https://comunicore.mooo.com/api/threads?limit=${postCount}&page=${pageParam}`,
        {
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjQzLCJpc3MiOiJmb3J1bSIsImV4cCI6MTc3NDc4MzU0MiwianRpIjoiQVowNVBENjNjWHU1eHNkKzBZcW9jQSJ9.uGWRGSnAfVZasfbkmRzThMjA9IJ6Xx6Rpa2Av9OAS5E`,
          },
        },
      );

      if (!res.ok) throw new Error('Ошибка сети');
      return res.json();
    },

    getNextPageParam: (lastPage, allPages) => {
      if (!lastPage.have_next) return undefined;
      return allPages.length + 1;
    },
  });

  const observer = useRef<IntersectionObserver | null>(null);

  const lastElementRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (!node) return;

      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
          }
        },
        {
          rootMargin: '300px',
          threshold: 0,
        },
      );

      observer.current.observe(node);
    },
    [hasNextPage, isFetchingNextPage, fetchNextPage],
  );

  const { mutate: handleLike } = useMutation({
    mutationFn: async (threadId: number) => {
      console.log(`Лайк отправлен на сервер для треда: ${threadId}`);
    },

    onMutate: async (threadId) => {
      await queryClient.cancelQueries({ queryKey: ['threads'] });

      const previousData = queryClient.getQueryData(['threads']);

      queryClient.setQueryData(['threads'], (old: any) => {
        if (!old) return old;

        return {
          ...old,
          pages: old.pages.map((page: Response) => ({
            ...page,
            threads: page.threads.map((thread) =>
              thread.id === threadId
                ? {
                    ...thread,
                    // тут можно добавить логику лайков если появится в API
                  }
                : thread,
            ),
          })),
        };
      });

      return { previousData };
    },
  });

  if (isLoading)
    return <div className='absolute top-[50%] left-[50%]'>Загрузка...</div>;

  if (error) return <div>Ошибка: {(error as Error).message}</div>;

  const threads =
    data?.pages
      .flatMap((page) => page.threads)
      .filter(
        (thread, index, self) =>
          index === self.findIndex((t) => t.id === thread.id),
      ) || [];

  return (
    <div>
      <Sorting />

      <div className='custom-scrollbar flex h-screen w-full flex-col gap-4 overflow-y-auto py-4 pr-2 pb-32'>
        {threads.map((thread, index) => {
          if (threads.length === index + 1) {
            return (
              <div ref={lastElementRef} key={thread.id}>
                <PostCard {...thread} onLike={() => handleLike(thread.id)}>
                  {thread.content}
                </PostCard>
              </div>
            );
          }

          return (
            <PostCard
              key={thread.id}
              {...thread}
              onLike={() => handleLike(thread.id)}
            >
              {thread.content}
            </PostCard>
          );
        })}

        <div className='h-6 text-center'>
          {isFetchingNextPage && 'Загрузка ещё...'}
        </div>
      </div>
    </div>
  );
}
