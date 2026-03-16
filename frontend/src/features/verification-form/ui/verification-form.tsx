import { useEffect, useState } from 'react';

import { Button } from '@/shared/ui/Button';

type Props = {
  email: string | null;
};

export const VerificationForm = (props: Props) => {
  const { email } = props;

  const [secondsLeft, setSecondsLeft] = useState(10);
  const [isDisabled, setIsDisabled] = useState(true);

  useEffect(() => {
    if (secondsLeft <= 0) {
      setIsDisabled(false);
      return;
    }

    const timer = setTimeout(() => {
      setSecondsLeft((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [secondsLeft]);

  return (
    <div className='flex flex-col gap-y-3'>
      {email ? (
        <p>
          Для подтверждения почты перейдите по ссылке в письме, которые мы
          отправили на <span className='font-semibold'>{email}</span>
        </p>
      ) : (
        <p>Не удалось отправить письмо. Не указана почта</p>
      )}
      <span className='text-gray-80 text-sm'>
        {secondsLeft > 0
          ? `Повторная отправка доступна через ${secondsLeft}`
          : 'Отправьте еще раз если письмо не пришло'}
      </span>
      <Button className='bg-black hover:bg-black' type='submit' disabled={isDisabled}>
        Отправить повторно
      </Button>
    </div>
  );
};
