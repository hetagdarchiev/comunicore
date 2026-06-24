import { User } from '@/entities/user';
import { cn } from '@/shared/lib/classNames';

import { formatInt } from '@/shared/lib/helpers/formatInt';

export function ProfileStats(
  props: Pick<User, 'rank' | 'threadsQuantity' | 'likes' | 'bookMarks'>,
) {
  const { bookMarks, likes, rank, threadsQuantity } = props;
  const stats = [
    {
      id: 'rank',
      quantity: formatInt(rank),
      label: 'Ранг',
    },
    {
      id: 'threads-quantity',
      quantity: formatInt(threadsQuantity),
      label: 'Треды',
    },
    {
      id: 'likes',
      quantity: formatInt(likes),
      label: 'Лайков',
    },
    {
      id: 'bookmarks',
      quantity: formatInt(bookMarks),
      label: 'Закладок',
    },
  ];
  return (
    <section>
      <ul
        className={cn(
          'bg-dark-1b grid grid-cols-2 rounded-[1.25rem] p-5',
          'md:divide-gray-9e/10 md:flex md:divide-x md:px-4 md:py-5',
        )}
      >
        {stats.map(({ id, label, quantity }) => (
          <li
            key={id}
            className={cn(
              'border-gray-9e/10 px-4 py-4 text-center',
              'max-md:odd:border-r max-md:nth-[n+3]:border-t',
              'md:flex-1 md:py-2.5',
            )}
          >
            <h2 className='text-2xl font-bold'>{quantity}</h2>
            <p className='text-sm text-gray-400 capitalize'>{label}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
