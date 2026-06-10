import { AppRouter } from '@/shared/config/app-router';
import { cn } from '@/shared/lib/classNames';
import { Button } from '@/shared/ui';

interface Props {
  className?: string;
}

export function AuthButtons({ className }: Props) {
  return (
    <div className={cn('flex gap-x-3', className)}>
      <Button
        href={AppRouter.login}
        color='ghost'
        size='sm'
        className='bg-dark-1b'
      >
        Войти
      </Button>
      <Button href={AppRouter.registration} size='sm'>
        Регистрация
      </Button>
    </div>
  );
}
