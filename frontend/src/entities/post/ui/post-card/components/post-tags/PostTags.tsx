import Link from 'next/link';

import { AppRouter } from '@/shared/config/app-router';

export const PostTags = ({ tags }: { tags: string[] }) => {
  const uniqueTags = Array.from(new Set(tags));

  return (
    <div className='flex flex-wrap gap-2.5 sm:basis-xl'>
      {uniqueTags.map((tag, index) => (
        <Link
          href={AppRouter.tags.getRoute(tag)}
          key={`${tag}-${index}`}
          className='bg-gray-ea text-gray-80 w-fit rounded-md px-2.5 py-1 text-xs transition-colors hover:bg-slate-200'
        >
          {tag}
        </Link>
      ))}
    </div>
  );
};
