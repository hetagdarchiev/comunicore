import { Button } from '@/shared/ui/Button';

export const VerificationForm = (props: any) => {
  const {} = props;

  return (
    <div className='flex max-w-125 flex-col gap-y-5'>
      <ul className='flex gap-x-1'>
        <li>0</li>
        <li>0</li>
        <li>0</li>
        <li>0</li>
        <li>0</li>
        <li>0</li>
      </ul>
      <Button type='submit'>Подтвердить</Button>
      <button className='text-blue-16 w-fit' type='button'>
        Отправить повторно
      </button>
    </div>
  );
};
