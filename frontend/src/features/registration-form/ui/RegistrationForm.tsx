'use client';

import { SubmitHandler, useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';

import lockIcon from '@/shared/assets/icons/form/lock.svg';
import mailIcon from '@/shared/assets/icons/form/mail.svg';
import userIcon from '@/shared/assets/icons/form/user.svg';
import { Button } from '@/shared/ui/Button';
import { Checkbox } from '@/shared/ui/Checkbox';
import { Input } from '@/shared/ui/Input';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  validationSchema,
  TRegistrationForm,
} from '../model/validation-schema';

export function RegistrationForm() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<TRegistrationForm>({
    resolver: zodResolver(validationSchema),
    mode: 'onSubmit',
  });

  const onSubmit: SubmitHandler<TRegistrationForm> = async (data) => {
    try {
      console.log('Данные проверены Zod и готовы к отправке:', data);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      reset();
      router.push('/verification');
    } catch (error) {
      console.error(error);
    }
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
      <Button type='submit' disabled={isSubmitting}>
        {isSubmitting ? 'Загрузка...' : 'Зарегистрироваться'}
      </Button>
    </form>
  );
}
