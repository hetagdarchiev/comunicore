'use client';

import { useCallback, useEffect } from 'react';

import { useTimer } from '@/shared/hooks/useTimer';
import { Button } from '@/shared/ui/button';

interface VerificationFormProps {
  email: string;
}

const COUNTDOWN = 10;

const TIMER_TITLES = {
  timer: (seconds: number) =>
    `Повторная отправка доступна через ${seconds} сек.`,
  default: 'Отправьте еще раз если письмо не пришло',
};

export function VerificationForm(props: VerificationFormProps) {
  const { email } = props;
  const { timerStart, secondsLeft, isActive } = useTimer();

  // dobavit logiku otpravki koda
  const handleResend = useCallback(() => {
    timerStart(COUNTDOWN);
  }, [timerStart]);

  // logika otpravki podtverzdenia
  useEffect(() => {
    handleResend();
  }, [handleResend]);

  return (
    <div className='flex flex-col gap-y-3'>
      <p>
        Для подтверждения почты перейдите по ссылке в письме, которое мы
        отправили на <span className='font-semibold'>{email}</span>
      </p>
      <span className='text-gray-80 text-sm'>
        {isActive ? TIMER_TITLES.timer(secondsLeft) : TIMER_TITLES.default}
      </span>
      <Button
        className='disabled:bg-gray-80 bg-black hover:bg-black disabled:cursor-not-allowed'
        disabled={isActive}
        onClick={handleResend}
      >
        Отправить повторно
      </Button>
    </div>
  );
}
