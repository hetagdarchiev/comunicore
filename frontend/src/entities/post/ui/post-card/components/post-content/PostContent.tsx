import Link from 'next/link';
import clsx from 'clsx';

import { AppRouter } from '@/shared/config/app-router';

interface PostContentProps {
  id: string | number;
  title: string;
  children: React.ReactNode;
}

export const PostContent = ({ id, title, children }: PostContentProps) => (
  <div className='mb-4'>
    <Link href={AppRouter.post.getRoute(String(id))}>
      <h2
        className={clsx(
          'mb-2.5 line-clamp-2 text-2xl leading-none font-bold wrap-break-word',
          'max-sm:text-xl',
        )}
      >
        {title}
      </h2>
    </Link>
    <p
      className={clsx(
        'line-clamp-6 text-base leading-6 font-light tracking-wider',
        'sm:max-w-full',
      )}
    >
      {children}
    </p>
  </div>
);
