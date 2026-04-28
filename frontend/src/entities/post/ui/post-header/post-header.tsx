import Image from 'next/image';
import Link from 'next/link';

// Убедитесь, что этот хелпер существует.
// Если нет, временно используйте: const formatDate = (d: Date) => d.toLocaleDateString();
import { formatDate } from '@/shared/lib/utils/formatDate';

interface PostHeaderProps {
  author_id: string | number;
  author_name: string;
  avatarUrl?: string;
  created_at: string | Date;
}

export const PostHeader = ({
  author_id,
  author_name,
  avatarUrl,
  created_at,
}: PostHeaderProps) => (
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
      <p className='text-gray-80 text-xs'>{formatDate(created_at)}</p>
    </div>
  </Link>
);
