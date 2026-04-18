import { useEffect, useState } from 'react';

import { Button } from '@/shared/ui/button';

const COUNTDOWN = 10;

const TIMER_TITLES = {
  timer: (seconds: number) =>
    `Повторная отправка доступна через ${seconds} сек.`,
  default: 'Отправьте еще раз если письмо не пришло',
};

export function VerificationForm(props: { email: string | null }) {
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

    setSecondsLeft(COUNTDOWN);
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
          ? TIMER_TITLES.timer(secondsLeft)
          : TIMER_TITLES.default}
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
}
