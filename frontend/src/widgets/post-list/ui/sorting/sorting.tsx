import { Button } from '@/shared/ui/button';
import { ClockIcon } from '@/shared/ui/clock-Icon/clockIcon';

const SORTING_OPTIONS = [
  { id: 'new', label: 'Новое' },
  { id: 'top', label: 'Топ' },
  { id: 'my-subscriptions', label: 'Мои подписки' },
];

const BTN_CLASS =
  'text-gray-80 bg-gray-ea gap-1 rounded-[100px] px-2.5 py-1.5 tracking-wider hover:bg-blue-77 hover:text-gray-100 ';

export function Sorting() {
  return (
    <div className='flex gap-2.5 text-xs text-[13px]'>
      {SORTING_OPTIONS.map(({ id, label }) => (
        <Button key={id} className={`${BTN_CLASS}`}>
          <ClockIcon />
          <div className='font-normal'>{label}</div>
        </Button>
      ))}
    </div>
  );
}
