'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { authLoginMutation } from '@/shared/api/generated/@tanstack/react-query.gen';
import lockIcon from '@/shared/assets/icons/form/lock.svg';
import mailIcon from '@/shared/assets/icons/form/mail.svg';
import { Button } from '@/shared/ui/Button';
import { Input } from '@/shared/ui/Input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';

import { type LoginSchema, loginSchema } from '../model/login-schema';

export function AuthForm() {
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  });

  const { mutate, isPending } = useMutation({
    ...authLoginMutation(),
    onSuccess: (data) => {
      localStorage.setItem('accessToken', data.accessToken);
      router.push('/');
      router.refresh();
    },
    onError: (err: any) => {
      setServerError(err?.message || 'Ошибка авторизации');
    },
  });

  const onSubmit = (data: LoginSchema) => {
    setServerError(null);
    mutate({ body: data });
  };

  return (
    <form className='flex flex-col gap-y-5' onSubmit={handleSubmit(onSubmit)}>
      <Input
        {...register('login')}
        icon={mailIcon}
        type='text'
        placeholder='Почта'
        error={errors.login}
        disabled={isPending}
      />

      <Input
        {...register('password')}
        icon={lockIcon}
        type='password'
        placeholder='Пароль'
        error={errors.password}
        disabled={isPending}
      />

      <div className='flex flex-col gap-y-2'>
        <Link
          href='/forget-password'
          className='text-blue-16 w-fit text-sm font-semibold'
        >
          Забыл пароль
        </Link>

        {serverError && (
          <p className='animate-in fade-in text-xs font-medium text-red-500'>
            {serverError}
          </p>
        )}
      </div>

      <Button type='submit' disabled={isPending}>
        {isPending ? 'Загрузка...' : 'Войти'}
      </Button>
    </form>
  );
}
