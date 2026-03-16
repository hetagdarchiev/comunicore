import { useEffect, useState } from 'react';

import { Button } from '@/shared/ui/Button';

type Props = {
  email: string | null;
};

const countdown = 10;

export const VerificationForm = (props: Props) => {
  const { email } = props;

  const [secondsLeft, setSecondsLeft] = useState(0);

  useEffect(() => {
    if (secondsLeft <= 0) return;

    const timer = setTimeout(() => {
      setSecondsLeft((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [secondsLeft]);

  const handleResend = async () => {
    console.log('Запрос на повторную отправку ссылки для:', email);

    setSecondsLeft(countdown);
  };

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
          ? `Повторная отправка доступна через ${secondsLeft} сек.`
          : 'Отправьте еще раз если письмо не пришло'}
      </span>
      <Button
        className='disabled:bg-gray-80 bg-black hover:bg-black disabled:cursor-not-allowed'
        disabled={secondsLeft > 0 || !email}
        onClick={handleResend}
      >
        Отправить повторно
      </Button>
    </div>
  );
};
