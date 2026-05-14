import Link from 'next/link';

import { AppRouter } from '@/shared/config/app-router';
import { formatDate } from '@/shared/lib/helpers/formatDate';
import { ProfileAvatar } from '@/shared/ui/profile-avatar';

interface PostHeaderProps {
  authorId: string | number;
  authorName: string;
  avatarUrl?: string;
  createdAt: string;
}

export const PostHeader = ({
  authorId,
  authorName,
  avatarUrl,
  createdAt,
}: PostHeaderProps) => (
  <Link
    href={AppRouter.user.getRoute(String(authorId))}
    className='mb-4 flex w-fit items-center gap-3 tracking-wider'
  >
    <div className='relative h-10 w-10'>
      <ProfileAvatar
        fill
        unoptimized
        authorName={authorName}
        avatarUrl={avatarUrl}
      />
    </div>
    <div>
      <p className='mb-0.5 leading-none font-normal text-slate-900'>
        {authorName}
      </p>
      <p className='text-gray-80 text-xs'>{formatDate(createdAt)}</p>
    </div>
  </Link>
);
