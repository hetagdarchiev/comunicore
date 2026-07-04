import { memo } from 'react';
import Link from 'next/link';

import { DashboardItemTypes } from '../../../model/types/dashboard-item.types';

import { cn } from '@/shared/lib/classNames';
import { formatInt } from '@/shared/lib/helpers/formatInt';
import { formatTimeAgo } from '@/shared/lib/helpers/formatTimeAgo';
import { Tag } from '@/shared/ui';

interface DashboardItemProps extends DashboardItemTypes {
  href: string;
}

export const DashboardItem = memo(
  ({
    answers,
    chapter,
    title,
    updatedAt,
    views,
    description,
    href,
  }: DashboardItemProps) => (
    <li
      className={cn(
        'flex flex-col gap-7.5',
        'max-sm:not-last:border-b-gray-9e/10 max-sm:not-last:border-b max-sm:not-last:pb-7.5',
        'sm:flex-row sm:items-center sm:justify-between',
      )}
    >
      <div className='relative flex flex-col gap-y-2.5'>
        <h4 className='2xl:text-lg'>
          <Link href={href} className='hover:underline'>
            {title}
          </Link>
        </h4>
        {description && <p>{description}</p>}
        <Tag className='max-2xl:text-sm'>{chapter}</Tag>
      </div>
      <div
        className={cn(
          'grid max-w-94 grid-cols-3 items-center justify-items-center gap-x-5 justify-self-end',
          'max-sm:max-w-full',
          '**:[p,time]:text-gray-9e text-center *:flex *:flex-col **:[p,time]:font-normal **:[span]:font-bold',
          '2xl:**:[span]:text-lg',
          'max-2xl:**:[p,time]:text-sm',
        )}
      >
        <div>
          <span>{formatInt(answers)}</span>
          <p>ответов</p>
        </div>
        <div>
          <span>{formatInt(views)}</span>
          <p>просмотров</p>
        </div>
        <time dateTime={updatedAt}>
          Обновлён {formatTimeAgo(updatedAt, { short: true })}
        </time>
      </div>
    </li>
  ),
);

DashboardItem.displayName = 'DashboardItem';
