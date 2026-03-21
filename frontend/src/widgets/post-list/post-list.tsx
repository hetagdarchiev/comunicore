'use client';
import { useState } from 'react';

import { PostCard } from '@/entities/post';
import { Button } from '@/shared/ui/Button';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export function PostList() {
  const queryClient = useQueryClient();
  const postCount = 4;
  const [pageNumber, setpageNumber] = useState(1);
  const [limit, setLimit] = useState(postCount);
  const [offset, setOffset] = useState(0);
  const adress = '/res.json';

  const { data, isLoading, error } = useQuery({
    queryKey: ['threads', limit, offset],
    queryFn: async () => {
      const res = await fetch(`${adress}?limit=${limit}&offset=${offset}`);
      if (!res.ok) throw new Error('Ошибка сети');
      return res.json();
    },
  });

  const { mutate: handleLike } = useMutation({
    mutationFn: async (postId: number) => {
      console.log(`Лайк отправлен на сервер для поста: ${postId}`);
    },

    onMutate: async (postId) => {
      await queryClient.cancelQueries({ queryKey: ['threads', limit, offset] });
      const previousData = queryClient.getQueryData(['threads', limit, offset]);
      queryClient.setQueryData(['threads', limit, offset], (old: any) => {
        if (!old) return old;
        return {
          ...old,
          items: old.items.map((post: any) =>
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
        };
      });
      return { previousData };
    },
  });

  if (isLoading)
    return <div className='absolute top-[50%] left-[50%]'>Загрузка...</div>;
  if (error) return <div>Ошибка: {error.message}</div>;

  const threads = data?.items || [];

  return (
    <div className='custom-scrollbar flex h-screen w-full flex-col gap-4 overflow-y-auto py-4 pr-2 pb-32'>
      {threads.slice(offset, limit).map((post: any) => (
        <PostCard
          key={post.post_id}
          {...post}
          onLike={() => handleLike(post.post_id)}
        >
          {post.description}
        </PostCard>
      ))}

      <div className='absolute top-[50%] right-0 flex flex-col content-center items-center gap-1'>
        <Button
          className='grow rotate-90'
          onClick={() => {
            if (offset > 0) {
              setOffset(offset - postCount);
              setLimit(limit - postCount);
              setpageNumber(pageNumber - 1);
            }
          }}
        >
          {'<-'}
        </Button>
        <span className='grow'>{pageNumber}</span>
        <Button
          className='grow rotate-90'
          onClick={() => {
            setOffset(offset + postCount);
            setLimit(limit + postCount);
            setpageNumber(pageNumber + 1);
          }}
        >
          {'->'}
        </Button>
      </div>
    </div>
  );
}
