import Image from 'next/image';
import Link from 'next/link';

// Убедитесь, что этот хелпер существует.
// Если нет, временно используйте: const formatDate = (d: Date) => d.toLocaleDateString();
import { formatDate } from '@/shared/lib/utils/formatDate';
import { AppRouter } from '@/shared/config/app-router';

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
    href={AppRouter.user(authorId)}
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
      <p className='text-gray-80 text-xs'>{formatDate(createdAt)}</p>
    </div>
  </Link>
);
