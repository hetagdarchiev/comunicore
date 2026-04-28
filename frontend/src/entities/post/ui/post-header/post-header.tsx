import Image from 'next/image';
import Link from 'next/link';

import { formatDate } from '@/shared/lib/utils/formatDate';

interface PostHeaderProps {
  authorId: string | number;
  authorName: string;
  avatarUrl?: string;
  createdAt: string | Date;
}

export const PostHeader = ({
  authorId,
  authorName,
  avatarUrl,
  createdAt,
}: PostHeaderProps) => (
  <Link
    href={`/user/${authorId}`}
    className='mb-4 flex w-fit items-center gap-3 tracking-wider'
  >
    <div className='relative h-10 w-10'>
      <Image
        src={avatarUrl || '/avatar.png'}
        alt={authorName}
        fill
        unoptimized
        className='rounded-full object-cover'
      />
    </div>
    <div>
      <h3 className='mb-0.5 leading-none font-normal text-slate-900'>
        {authorName}
      </h3>
      <p className='text-gray-80 text-xs'>{formatDate(new Date(createdAt))}</p>
    </div>
  </Link>
);
