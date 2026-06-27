import { memo } from 'react';

import { DashboardItemTypes } from '../../../model/types/dashboard-item.types';

import { cn } from '@/shared/lib/classNames';
import { formatInt } from '@/shared/lib/helpers/formatInt';
import { formatTimeAgo } from '@/shared/lib/helpers/formatTimeAgo';
import { Tag } from '@/shared/ui';

export const DashboardItem = memo(
  ({
    answers,
    chapter,
    title,
    updatedAt,
    views,
    description,
  }: DashboardItemTypes) => (
    <li className='flex items-center justify-between gap-x-7.5'>
      <div className='relative flex flex-col gap-y-2.5'>
        <h4 className='text-lg'>{title}</h4>
        {description && <p>{description}</p>}
        <Tag>{chapter}</Tag>
      </div>
      <div
        className={cn(
          'grid max-w-94 grid-cols-3 items-center justify-items-center gap-x-5 justify-self-end',
          '**:[p,time]:text-gray-9e text-center *:flex *:flex-col **:[p,time]:font-normal **:[span]:text-lg **:[span]:font-bold',
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
