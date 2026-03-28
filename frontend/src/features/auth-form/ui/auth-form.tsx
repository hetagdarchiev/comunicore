import Link from 'next/link';

import lockIcon from '@/assets/icons/form/lock.svg';
import mailIcon from '@/assets/icons/form/mail.svg';
import { Button } from '@/shared/ui/Button';
import { Input } from '@/shared/ui/Input';

export function AuthForm() {
  return (
    <form className='flex flex-col gap-y-5'>
      <Input icon={mailIcon} type='email' name='email' placeholder='Почта' />
      <Input
        icon={lockIcon}
        type='password'
        name='password'
        placeholder='Пароль'
      />
      <Link className='text-blue-16 font-semibold' href='/forget-password'>
        Забыл пароль
      </Link>
      <Button type='submit'>Войти</Button>
    </form>
  );
}
