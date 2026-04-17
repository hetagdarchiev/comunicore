'use client';

import Image from 'next/image';
import Link from 'next/link';

import { formatDate } from '@/shared/lib/format-date';

import { PostProps } from './model/types/post-card.types';
import { PostCommentsLink } from './ui/post-comments-link';
import { PostLikeButton } from './ui/post-like-button';
import { PostViews } from './ui/post-views';

export const PostCard = ({
  author_name,
  avatarUrl,
  created_at,
  title,
  children,
  tags,
  isLiked = false,
  onLike,
  stats,
  author_id,
  id,
}: PostProps) => {
  const date = new Date(created_at);
  const uniqueTags = Array.from(new Set(tags)); // Очистка тегов от дублей для исключения ошибок ключей (key)
  return (
    <article className='border-gray-ea bg-post-card mx-auto w-full max-w-5xl rounded-md border px-7.5 py-5 shadow-[2px_1px_5px_0px_#00000026]'>
      <Link
        href={`/user/${author_id}`}
        className='mb-4 flex w-fit items-center gap-3 tracking-wider'
      >
        <div className='relative h-10 w-10'>
          <Image
            src={avatarUrl || '/avatar.png'}
            alt={author_name}
            fill
            unoptimized
            className='rounded-full object-cover'
          />
        </div>
        <div>
          <h3 className='mb-0.5 leading-none font-normal text-slate-900'>
            {author_name}
          </h3>
          <p className='text-gray-80 text-xs'>{formatDate(date)}</p>
        </div>
      </Link>

      <div className='mb-4'>
        <Link href={`/posts/${id}`}>
          <h2 className='mb-2.5 text-2xl leading-none font-bold max-sm:text-xl'>
            {title}
          </h2>
        </Link>
        <p className='line-clamp-6 text-base leading-6 font-light tracking-wider'>
          {children}
        </p>
      </div>

      <div className='flex items-start justify-between gap-3 max-sm:flex-col sm:items-center'>
        <div className='flex flex-wrap gap-2.5 sm:basis-2xl'>
          {uniqueTags.map((tag, index) => (
            <Link
              href={`/tags/${tag}`}
              key={`${tag}-${index}`}
              className='bg-gray-ea text-gray-80 w-fit rounded-md px-2.5 py-1 text-xs transition-colors hover:bg-slate-200'
            >
              {tag}
            </Link>
          ))}
        </div>

        <div className='text-gray-80 flex items-center gap-4'>
          <PostViews count={stats?.views || 0} />
          <PostCommentsLink count={stats?.comments || 0} postId={id} />
          <PostLikeButton
            count={stats?.likes || 0}
            isLiked={isLiked}
            onLike={onLike}
          />
        </div>
      </div>
    </article>
  );
};
