import { LuUserPlus } from 'react-icons/lu';
import clsx from 'clsx';

import { AppRouter } from '@/shared/config/app-router';
import { Button } from '@/shared/ui';

interface Props {
  className?: string;
}

export function AuthButtons({ className }: Props) {
  return (
    <div className={clsx('flex gap-x-2.5', className)}>
      <Button
        href={AppRouter.registration}
        className='bg-orange-f4 hover:bg-orange-c5 flex items-center gap-x-3'
      >
        <span className='inline-flex h-5 w-5'>
          <LuUserPlus
            aria-hidden={true}
            width={20}
            height={20}
            className='inline min-h-5 min-w-5'
          />
        </span>
        Регистрация
      </Button>
      <Button href={AppRouter.login}>Войти</Button>
    </div>
  );
}
