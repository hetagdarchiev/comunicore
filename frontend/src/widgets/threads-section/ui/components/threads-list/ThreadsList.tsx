import { threadsList } from '../../../model/data/mock-posts';

import { PostCard } from '@/entities/post';

import { cn } from '@/shared/lib/classNames';

const tableGridClassName =
  'grid grid-cols-[52.5%_11.5rem_auto_auto] items-center *:not-first:text-center';

export function ThreadsList() {
  return (
    <div className='border-gray-9e/10 bg-dark-1b/50 h-fit rounded-[0.625rem] border py-1.25'>
      <header
        className={cn(
          'text-gray-9e border-b-gray-9e/10 border-b px-1.25 py-5',
          tableGridClassName,
        )}
      >
        <span>Тред</span>
        <span>Раздел</span>
        <span>Ответы</span>
        <span>Просмотры</span>
      </header>
      <ul className=''>
        {threadsList.map((thread) => (
          <li
            key={thread.id}
            className='not-last:border-b-gray-9e/10 px-2.5 py-5 not-last:border-b'
          >
            <PostCard tableGrid={tableGridClassName} post={thread} />
          </li>
        ))}
      </ul>
    </div>
  );
}
