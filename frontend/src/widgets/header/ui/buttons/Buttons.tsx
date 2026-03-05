import Image from 'next/image';

import registrationIcon from '@/shared/assets/icons/registration-icon.svg';
import { Button } from '@/shared/ui/Button';

export function Buttons() {
  return (
    <div className='flex gap-x-2.5'>
      <Button
        href='registration'
        className='bg-orange-f4 hover:bg-orange-c5 flex items-center gap-x-3'
      >
        <span className='inline-flex h-5 w-5'>
          <Image
            src={registrationIcon}
            alt=''
            width={20}
            height={20}
            className='inline'
          />
        </span>
        Регистрация
      </Button>
      <Button href='login'>Войти</Button>
    </div>
  );
}
