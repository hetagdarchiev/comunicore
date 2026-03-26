'use client';

import { SubmitHandler, useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';

import { userCreateMutation } from '@/shared/api/generated/@tanstack/react-query.gen';
import type {
  UserCreateError,
  UserCreateRequest,
} from '@/shared/api/generated/types.gen';
import lockIcon from '@/shared/assets/icons/form/lock.svg';
import mailIcon from '@/shared/assets/icons/form/mail.svg';
import userIcon from '@/shared/assets/icons/form/user.svg';
import { getErrorMessage } from '@/shared/lib/helpers';
import { Button } from '@/shared/ui/Button';
import { Checkbox } from '@/shared/ui/Checkbox';
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
    onError: (error: UserCreateError) => {
      alert(getErrorMessage(error));
    },
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TRegistrationForm>({
    resolver: zodResolver(validationSchema),
    mode: 'onSubmit',
  });

  const onSubmit: SubmitHandler<TRegistrationForm> = async (data) => {
    const body: UserCreateRequest = {
      name: data.name,
      email: data.email,
      password: data.password,
    };
    await registration.mutateAsync({ body });
    router.push(`/verification?email=${encodeURIComponent(data.email)}`);
  };

  return (
    <form
      className='flex max-w-125 flex-col gap-y-5'
      onSubmit={handleSubmit(onSubmit)}
    >
      <Input
        icon={userIcon}
        placeholder='Name'
        error={errors.name}
        {...register('name')}
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

      <Button type='submit' disabled={registration.isPending}>
        {registration.isPending ? 'Загрузка...' : 'Зарегистрироваться'}
      </Button>

      {registration.isError && (
        <p className='text-center text-sm text-red-500'>
          {getErrorMessage(registration.error)}
        </p>
      )}
    </form>
  );
}
