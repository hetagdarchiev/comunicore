'use client';
import { SubmitHandler, useForm } from 'react-hook-form';

import lockIcon from '@/shared/assets/icons/form/lock.svg';
import mailIcon from '@/shared/assets/icons/form/mail.svg';
import userIcon from '@/shared/assets/icons/form/user.svg';
import { Button } from '@/shared/ui/Button';
import { Checkbox } from '@/shared/ui/Checkbox';
import { Input } from '@/shared/ui/Input';

interface IRegistrationForm {
  login: string;
  email: string;
  password: string;
  policy: boolean;
}

export function RegistrationForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IRegistrationForm>();

  const onSubmit: SubmitHandler<IRegistrationForm> = (data) => {
    console.log('Данные:', data);
  };

  const errorKeys = Object.keys(errors) as Array<keyof IRegistrationForm>;
  const firstError = errorKeys.length > 0 ? errors[errorKeys[0]] : null;

  return (
    <form
      className='flex max-w-125 flex-col gap-y-5'
      onSubmit={handleSubmit(onSubmit)}
    >
      <Input
        icon={userIcon}
        type='text'
        placeholder='Login'
        {...register('login', { required: 'Введите логин' })}
      />
      <Input
        icon={mailIcon}
        type='email'
        placeholder='Email'
        {...register('email', { required: 'Введите email' })}
      />
      <Input
        icon={lockIcon}
        type='password'
        placeholder='Password'
        {...register('password', {
          required: 'Пароль должен содержать не менее 6 символов',
          minLength: 6,
        })}
      />
      <Checkbox
        id='use-condition-agreement'
        label='Соглашаюсь с условиями пользования'
        {...register('policy', { required: 'Условия должны быть приняты' })}
      />
      <Button type='submit'>Зарегистрироваться</Button>
      {firstError && (
        <span className='animate-in fade-in text-sm text-red-500 duration-300'>
          {firstError.message || 'Ошибка заполнения'}
        </span>
      )}
    </form>
  );
}
