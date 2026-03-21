'use client';
import { useState } from 'react';

import { PostCard } from '@/entities/post';
import { useQuery } from '@tanstack/react-query';

export function PostList() {
  const [limit, setLimit] = useState(4);
  const [offset, setOffset] = useState(0);
  const adress = '/res.json';
  const { data, isLoading, error } = useQuery({
    queryKey: ['threads'],
    queryFn: async () => {
      //Используем ОТНОСИТЕЛЬНЫЙ путь (чтобы работал rewrite)
      const res = await fetch(`${adress}?limit=${limit}&offset=${offset}`);
      if (!res.ok) throw new Error('Ошибка сети');
      return res.json();
    },
  });

  if (isLoading) return <div>Загрузка...</div>;
  if (error) return <div>Ошибка: {error.message}</div>;

  const threads = data?.items || [];

  return (
    <div className='custom-scrollbar flex h-screen w-full flex-col gap-4 overflow-y-auto py-4 pr-2 pb-32'>
      {threads.slice(offset, limit).map((post: any) => (
        <PostCard
          key={post.post_id}
          post_id={post.post_id}
          user_id={post.user_id}
          author_name={post.author_name}
          avatarUrl={post.avatarUrl}
          timeAgo={post.timeAgo}
          title={post.title}
          tags={post.tags}
          isLiked={post.isLiked}
          stats={post.stats}
          onLike={() => console.log(`Лайк поста ${post.post_id}`)}
        >
          {post.description}
        </PostCard>
      ))}
    </div>
  );
}
