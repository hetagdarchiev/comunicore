'use client';

import { SubmitHandler, useForm } from 'react-hook-form';
import { LuAtSign, LuLock } from 'react-icons/lu';
import Link from 'next/link';
import { zodResolver } from '@hookform/resolvers/zod';

import { useLogin } from '../../model/hooks/useLogin';
import {
  loginFormSchema,
  type LoginFormTypes,
} from '../../model/schemas/login-form.schema';

import { AppRouter } from '@/shared/config/app-router';
import { getErrorMessage } from '@/shared/lib/helpers/getErrorMessage';
import { Button, ErrorMessage, Input, Label } from '@/shared/ui';

const defaultValues = {
  login: '',
  password: '',
};

export function LoginForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginFormTypes>({
    resolver: zodResolver(loginFormSchema),
    defaultValues,
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
  });

  const { mutate: loginMutate, isPending, error: serverError } = useLogin();

  const onSubmit: SubmitHandler<LoginFormTypes> = (data) => {
    loginMutate(
      { body: data },
      {
        onSuccess: () => {
          reset(defaultValues);
        },
      },
    );
  };

  return (
    <form
      className='flex w-full max-w-125 flex-col items-center gap-y-5 *:[div]:w-full'
      onSubmit={handleSubmit(onSubmit)}
    >
      <Label htmlFor='user-login-email' error={errors.login}>
        <LuAtSign size={24} aria-hidden={true} role='img' />
        <Input
          id='user-login-email'
          {...register('login')}
          type='text'
          isError={errors.login?.message}
          placeholder='Почта'
          disabled={isPending}
        />
      </Label>

      <Label htmlFor='user-login-password' error={errors.password}>
        <LuLock size={24} aria-hidden={true} role='img' />
        <Input
          id='user-login-password'
          {...register('password')}
          type='password'
          placeholder='Пароль'
          isError={errors.password?.message}
          disabled={isPending}
        />
      </Label>

      <Button type='submit' disabled={isPending} className='w-full'>
        {isPending ? 'Загрузка...' : 'Войти'}
      </Button>

      <div className='flex flex-col gap-y-2'>
        <Link
          href={AppRouter.recovery.password}
          className='text-blue-16 text-center text-sm font-semibold'
        >
          Забыл пароль
        </Link>

        {serverError && (
          <ErrorMessage error={getErrorMessage(serverError.message)} />
        )}
      </div>
    </form>
  );
}
