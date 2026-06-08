import { accCategories } from '../../../model/data/acc.data';
import { AccItem } from '../acc-item/AccItem';

import { cn } from '@/shared/lib/classNames';

interface Props {
  className?: string;
}

export function AccList({ className }: Props = {}) {
  return (
    <ul className={cn('flex flex-1 flex-col gap-y-2.5', className)}>
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
