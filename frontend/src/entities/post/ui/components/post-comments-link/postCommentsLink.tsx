'use client';

import { memo } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import messageIcon from '@/assets/icons/message-square.svg';

export const PostCommentsLink = memo(
  ({ count, postId }: { count: number; postId: number }) => (
    <Link
      href={`/posts/${postId}/comments`}
      className='text-gray-80 flex items-center gap-1.5 transition-colors hover:text-slate-600'
    >
      <Image
        src={messageIcon}
        alt='Comments'
        className='h-4 w-4'
        aria-hidden='true'
        unoptimized
      />
      <span className='text-sm font-medium'>{count}</span>
    </Link>
  ),
);

PostCommentsLink.displayName = 'PostCommentsLink';
