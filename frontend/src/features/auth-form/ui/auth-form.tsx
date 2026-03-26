'use client';

import { useForm } from 'react-hook-form';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { authLoginMutation } from '@/shared/api/generated/@tanstack/react-query.gen';
import type {
  AuthLoginError,
  JwtToken,
} from '@/shared/api/generated/types.gen';
import { userMeOptions } from '@/shared/api/generated/@tanstack/react-query.gen';
import lockIcon from '@/shared/assets/icons/form/lock.svg';
import mailIcon from '@/shared/assets/icons/form/mail.svg';
import { getErrorMessage } from '@/shared/lib/helpers/getErrorMessage';
import { Button } from '@/shared/ui/Button';
import { Input } from '@/shared/ui/Input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useQueryClient } from '@tanstack/react-query';

import { authSchema, type TAuthForm } from '../model/validation-schema';

export function AuthForm() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const loginMutation = useMutation({
    ...authLoginMutation(),
    onError: (error: AuthLoginError) => {
      alert(getErrorMessage(error));
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TAuthForm>({
    resolver: zodResolver(authSchema),
    mode: 'onSubmit',
  });

  const onSubmit = async (data: TAuthForm) => {
    const tokenData = await loginMutation.mutateAsync({
      body: {
        login: data.email,
        password: data.password,
      },
    });

    localStorage.setItem('accessToken', tokenData.accessToken);
    localStorage.setItem('refreshToken', tokenData.refreshToken);

    // Tell `useAuth` hook to re-read localStorage and re-render.
    window.dispatchEvent(new Event('accessTokenUpdated'));

    // Wait until `/api/user/me` is available, then navigate to avoid header flicker.
    await queryClient.fetchQuery(userMeOptions());

    router.push('/');
  };

  return (
    <form className='flex flex-col gap-y-5' onSubmit={handleSubmit(onSubmit)}>
      <Input
        icon={mailIcon}
        type='text'
        placeholder='Почта'
        error={errors.email}
        {...register('email')}
      />

      <Input
        icon={lockIcon}
        type='password'
        placeholder='Пароль'
        error={errors.password}
        {...register('password')}
      />

      <Link
        className='text-blue-16 text-lg font-semibold'
        href='/forget-password'
      >
        Забыл пароль
      </Link>

      <Button type='submit' disabled={loginMutation.isPending}>
        {loginMutation.isPending ? 'Входим...' : 'Войти'}
      </Button>

      {loginMutation.isError && (
        <p className='mt-2 text-center text-sm text-red-500'>
          {getErrorMessage(loginMutation.error)}
        </p>
      )}
    </form>
  );
}
