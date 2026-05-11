import {
  LuArrowUpRight,
  LuCircleCheckBig,
  LuClock,
  LuFlame,
} from 'react-icons/lu';
import clsx from 'clsx';

import { Button } from '@/shared/ui/button';

const SORTING_OPTIONS = [
  { id: 'new', Icon: LuClock, label: 'Новое' },
  { id: 'top', Icon: LuArrowUpRight, label: 'Топ' },
  { id: 'best', Icon: LuFlame, label: 'Лучшие' },
  { id: 'closed', Icon: LuCircleCheckBig, label: 'Закрытые' },
  { id: 'my-subscriptions', Icon: LuClock, label: 'Мои подписки' },
];

const BTN_CLASS =
  'text-gray-80 bg-gray-ea gap-1 rounded-[100px] px-2.5 py-1.5 tracking-wider hover:bg-blue-16 hover:text-white ';

export function Sorting({ className = '' }: { className?: string }) {
  return (
    <div
      className={clsx(
        'no-scrollbar flex w-full gap-2.5 overflow-x-auto py-5 text-xs text-[13px]',
        className,
      )}
    >
      {SORTING_OPTIONS.map(({ id, Icon, label }) => (
        <Button key={id} className={`flex shrink-0 ${BTN_CLASS}`}>
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
