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

type Post = {
  post_id: number;
  description: string;
  isLiked: boolean;
  stats: {
    likes: number;
  };
};

type Response = {
  items: Post[];
};

export function PostList() {
  const queryClient = useQueryClient();
  const postCount = 4;
  const adress = '/res.json';

  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery<Response>({
    queryKey: ['threads'],
    initialPageParam: 0,
    queryFn: async ({ pageParam }) => {
      const res = await fetch(
        `${adress}?limit=${postCount}&offset=${pageParam}`,
      );
      if (!res.ok) throw new Error('Ошибка сети');
      return res.json();
    },
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.items.length < postCount) return undefined;

      if (allPages.length >= 5) return undefined;

      return allPages.length * postCount;
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
    mutationFn: async (postId: number) => {
      console.log(`Лайк отправлен на сервер для поста: ${postId}`);
    },

    onMutate: async (postId) => {
      await queryClient.cancelQueries({ queryKey: ['threads'] });

      const previousData = queryClient.getQueryData(['threads']);

      queryClient.setQueryData(['threads'], (old: any) => {
        if (!old) return old;

        return {
          ...old,
          pages: old.pages.map((page: Response) => ({
            ...page,
            items: page.items.map((post) =>
              post.post_id === postId
                ? {
                    ...post,
                    isLiked: !post.isLiked,
                    stats: {
                      ...post.stats,
                      likes: post.isLiked
                        ? post.stats.likes - 1
                        : post.stats.likes + 1,
                    },
                  }
                : post,
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
      .flatMap((page) => page.items)
      .filter(
        (post, index, self) =>
          index === self.findIndex((p) => p.post_id === post.post_id),
      ) || [];

  return (
    <div>
      <Sorting />
      <div className='custom-scrollbar flex h-screen w-full flex-col gap-4 overflow-y-auto py-4 pr-2 pb-32'>
        {threads.map((post, index) => {
          if (threads.length === index + 1) {
            return (
              <div ref={lastElementRef} key={post.post_id}>
                <PostCard {...post} onLike={() => handleLike(post.post_id)}>
                  {post.description}
                </PostCard>
              </div>
            );
          }
          return (
            <PostCard
              key={post.post_id}
              {...post}
              onLike={() => handleLike(post.post_id)}
            >
              {post.description}
            </PostCard>
          );
        })}

        {/* фикс дергания loader */}
        <div className='h-6 text-center'>
          {isFetchingNextPage && 'Загрузка ещё...'}
        </div>
      </div>
    </div>
  );
}
