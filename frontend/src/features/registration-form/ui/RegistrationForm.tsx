'use client';

import { SubmitHandler, useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';

import {
  authLoginMutation,
  userCreateMutation,
} from '@/shared/api/generated/@tanstack/react-query.gen';
import type { UserCreateRequest } from '@/shared/api/generated/types.gen';
import lockIcon from '@/shared/assets/icons/form/lock.svg';
import mailIcon from '@/shared/assets/icons/form/mail.svg';
import userIcon from '@/shared/assets/icons/form/user.svg';
import { getErrorMessage } from '@/shared/lib/helpers';
import { Button } from '@/shared/ui/Button';
import { Checkbox } from '@/shared/ui/Checkbox';
import { ErrorMessage } from '@/shared/ui/ErrorMessage';
import { Input } from '@/shared/ui/Input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';

import {
  TRegistrationForm,
  validationSchema,
} from '../model/schema/validation-schema';

export function RegistrationForm() {
  const router = useRouter();

  const registration = useMutation({
    ...userCreateMutation(),
    onSuccess: () => {
      reset();
    },
  });

  const loginUser = useMutation({
    ...authLoginMutation(),
    onSuccess: (data) => {
      localStorage.setItem('accessToken', data.accessToken);
      router.back();
    },
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<TRegistrationForm>({
    resolver: zodResolver(validationSchema),
    mode: 'onChange',
  });

  const onSubmit: SubmitHandler<TRegistrationForm> = async (data) => {
    const newUser: UserCreateRequest = {
      name: data.login,
      email: data.email,
      password: data.password,
    };

    try {
      await registration.mutateAsync({ body: newUser });

      await loginUser.mutateAsync({
        body: { login: data.email, password: data.password },
      });
    } catch (error) {
      console.error(error);
    }
    // router.push(`/verification?email=${encodeURIComponent(data.email)}`);
  };

  return (
    <form
      className='flex max-w-125 flex-col gap-y-5'
      onSubmit={handleSubmit(onSubmit)}
    >
      <Input
        icon={userIcon}
        placeholder='Login'
        error={errors.login}
        {...register('login')}
      />
      <Input
        icon={mailIcon}
        placeholder='Email'
        error={errors.email}
        {...register('email')}
      />
      <Input
        icon={lockIcon}
        type='password'
        placeholder='Password'
        error={errors.password}
        {...register('password')}
      />
      <Checkbox
        id='use-condition-agreement'
        label='Соглашаюсь с условиями пользования'
        error={errors.policy}
        {...register('policy')}
      />

      <Button type='submit' disabled={registration.isPending || !isValid}>
        {registration.isPending ? 'Загрузка...' : 'Зарегистрироваться'}
      </Button>

      {registration.isError && (
        <ErrorMessage error={getErrorMessage(registration.error)} />
      )}
    </form>
  );
}
