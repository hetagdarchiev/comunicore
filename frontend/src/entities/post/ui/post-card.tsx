'use client';

import Image from 'next/image';
import Link from 'next/link';

interface PostProps {
  author: string;
  avatarUrl: string;
  timeAgo: string;
  title: string;
  description: string;
  tags: string[];
  stats: {
    views: number;
    comments: number;
    likes: number;
  };
}

export const PostCard = ({
  author,
  avatarUrl,
  timeAgo,
  title,
  description,
  tags,
  stats,
}: PostProps) => (
  <div className='border-gray-ea bg-post-card mx-auto max-w-5xl rounded-md border px-7.5 py-5'>
    <Link
      href={''}
      className='mb-4 flex w-fit items-center gap-3 tracking-wider'
    >
      <div className='relative h-10 w-10'>
        <Image
          src={avatarUrl}
          alt={author}
          fill
          unoptimized
          className='rounded-full object-cover'
        />
      </div>
      <div>
        <h3 className='mb-0.5 leading-tight font-normal text-slate-900'>
          {author}
        </h3>
        <p className='text-gray-80 text-xs'>{timeAgo}</p>
      </div>
    </Link>

    <div className='mb-4'>
      <h2 className='mb-2.5 text-2xl leading-tight font-bold text-slate-900'>
        {title}
      </h2>
      <p className='leading-relaxed text-slate-600'>{description}</p>
    </div>

    {/* Футер */}
    <div className='mt-6 flex items-center justify-between'>
      <div className='flex gap-2'>
        {tags.map((tag) => (
          <span
            key={tag}
            className='cursor-pointer rounded-md bg-slate-100 px-3 py-1 text-xs text-slate-500 transition-colors hover:bg-slate-200'
          >
            {tag}
          </span>
        ))}
      </div>

      <div className='flex items-center gap-4 text-slate-400'>
        {/* Просмотры */}
        <div className='flex cursor-pointer items-center gap-1.5 transition-colors hover:text-slate-600'>
          <svg
            className='h-4.5 w-4.5'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
            viewBox='0 0 24 24'
          >
            <path d='M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z' />
            <circle cx='12' cy='12' r='3' />
          </svg>
          <span className='text-sm font-medium'>{stats.views}</span>
        </div>

        {/* Комментарии */}
        <div className='flex cursor-pointer items-center gap-1.5 transition-colors hover:text-slate-600'>
          <svg
            className='h-4.5 w-4.5'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
            viewBox='0 0 24 24'
          >
            <path d='M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z' />
          </svg>
          <span className='text-sm font-medium'>{stats.comments}</span>
        </div>

        {/* Лайки */}
        <div className='flex cursor-pointer items-center gap-1.5 transition-colors hover:text-slate-600'>
          <svg
            className='h-4.5 w-4.5'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
            viewBox='0 0 24 24'
          >
            <path d='m5 12 7-7 7 7M12 19V5' />
          </svg>
          <span className='text-sm font-medium'>{stats.likes}</span>
        </div>
      </div>
    </div>
  </div>
);
