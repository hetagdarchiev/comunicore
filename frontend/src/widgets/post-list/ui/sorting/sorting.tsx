import { Button } from '@/shared/ui/Button';
import { ClockIcon } from '@/shared/ui/Icon/ClockIcon';

const btnClass =
  'text-gray-80 bg-gray-ea gap-1 rounded-[100px] px-2.5 py-1.5 tracking-wider hover:bg-blue-77 hover:text-gray-100 ';

export function Sorting() {
  return (
    <div className='flex gap-2.5 text-xs text-[13px]'>
      <Button className={`${btnClass}`}>
        <ClockIcon />
        <div className='font-normal'>Новое</div>
      </Button>
      <Button className={`${btnClass}`}>
        <ClockIcon />
        <div className='font-normal'>Топ</div>
      </Button>
      <Button className={`${btnClass}`}>
        <ClockIcon />
        <div className='font-normal'>Мои подписки</div>
      </Button>
    </div>
  );
}
