import { User } from '@/entities/user';

import { cn } from '@/shared/lib/classNames';
import { formatInt } from '@/shared/lib/helpers/formatInt';

export function ProfileStats(
  props: Pick<
    User,
    'rank' | 'threadsQuantity' | 'likes' | 'bookMarks' | 'recivedLikes'
  >,
) {
  const { bookMarks, likes, rank, threadsQuantity, recivedLikes } = props;
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
      id: 'recived-likes',
      quantity: formatInt(recivedLikes),
      label: 'Получено лайков',
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
          'bg-dark-1b grid grid-cols-2 gap-2 rounded-[1.25rem] p-5',
          'sm:gap-5',
          'lg:divide-gray-9e/10 lg:flex lg:divide-x lg:px-4 lg:py-5',
        )}
      >
        {stats.map(({ id, label, quantity }) => (
          <li
            key={id}
            className={cn(
              'border-gray-9e/10 rounded-xl px-4 py-4 text-center last:col-span-2',
              'sm:rounded-2xl',
              'max-lg:bg-gray-9e/5 max-lg:border-gray-9e/10 max-lg:border max-lg:shadow-2xl',
              'lg:flex-1 lg:rounded-none lg:py-2.5',
            )}
          >
            <h2 className='text-xl font-bold sm:text-2xl'>{quantity}</h2>
            <p className='max-lg:text-gray-9e/60 text-[0.75rem] whitespace-nowrap capitalize sm:text-sm'>
              {label}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
