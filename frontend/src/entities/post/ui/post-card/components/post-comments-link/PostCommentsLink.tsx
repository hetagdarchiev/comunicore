import { memo } from 'react';
import { LuMessageSquare } from 'react-icons/lu';
import Link from 'next/link';

import { AppRouter } from '@/shared/config/app-router';

export const PostCommentsLink = memo(
  ({ count, postId }: { count: number; postId: number }) => (
    <Link
      href={AppRouter.post.getRoute(String(postId))}
      className='text-gray-80 flex items-center gap-1.5 transition-colors hover:text-slate-600'
    >
      <LuMessageSquare
        aria-label='Comments'
        width={16}
        height={16}
        role='link'
        className='h-4 w-4'
      />
      <span className='text-sm font-medium'>{count}</span>
    </Link>
  ),
);

PostCommentsLink.displayName = 'PostCommentsLink';
