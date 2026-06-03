import clsx from 'clsx';

import { accCategories } from '../../../model/data/acc.data';
import { AccItem } from '../acc-item/AccItem';

export function AccList({ className = '' }: { className?: string }) {
  return (
    <ul className={clsx('flex flex-1 flex-col gap-y-2.5', className)}>
      {accCategories.map((category, index) => (
        <AccItem
          key={category.title.toLowerCase()}
          category={category}
          index={index}
        />
      ))}
    </ul>
  );
}
