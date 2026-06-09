import {
  LuArrowUpRight,
  LuCircleCheckBig,
  LuClock,
  LuFlame,
} from 'react-icons/lu';

import { cn } from '@/shared/lib/classNames';
import { Button } from '@/shared/ui';

const SORTING_OPTIONS = [
  { id: 'new', Icon: LuClock, label: 'Новое' },
  { id: 'top', Icon: LuArrowUpRight, label: 'Топ' },
  { id: 'best', Icon: LuFlame, label: 'Лучшие' },
  { id: 'closed', Icon: LuCircleCheckBig, label: 'Закрытые' },
  { id: 'my-subscriptions', Icon: LuClock, label: 'Мои подписки' },
];

interface Props {
  className?: string;
}

export function Sorting({ className }: Props) {
  return (
    <div
      className={cn(
        'no-scrollbar flex w-full gap-2.5 overflow-x-auto py-5 text-xs text-[13px]',
        className,
      )}
    >
      {SORTING_OPTIONS.map(({ id, Icon, label }) => (
        <Button
          key={id}
          className={
            'text-gray-80 bg-gray-ea hover:bg-blue-16 flex shrink-0 cursor-pointer gap-1 rounded-[100px] px-2.5 py-1.5 tracking-wider hover:text-white'
          }
        >
          <Icon
            size={12}
            className='max-h-12 max-w-12'
            role='img'
            aria-hidden={true}
          />
          <div className='font-normal'>{label}</div>
        </Button>
      ))}
    </div>
  );
}
