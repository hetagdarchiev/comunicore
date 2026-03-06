'use client';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';

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
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IRegistrationForm>({
    reValidateMode: 'onBlur',
  });

  const onSubmit: SubmitHandler<IRegistrationForm> = (data) => {
    try {
      console.log('Отправка данных...', data);
      reset();
      router.push('/verification');
    } catch (error) {
      console.error('Ошибка при регистрации:', error);
    }
  };

  return (
    <form
      className='flex max-w-125 flex-col gap-y-5'
      onSubmit={handleSubmit(onSubmit)}
    >
      <Input
        icon={userIcon}
        type='text'
        placeholder='Login'
        error={errors.login}
        {...register('login', { required: 'Введите логин' })}
      />
      <Input
        icon={mailIcon}
        type='email'
        placeholder='Email'
        error={errors.email}
        {...register('email', {
          required: 'Введите email',
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: 'Неверный формат почты (пример: name@mail.com)',
          },
        })}
      />
      <Input
        icon={lockIcon}
        type='password'
        placeholder='Password'
        error={errors.password}
        {...register('password', {
          required: 'Введите пароль',
          minLength: {
            value: 4,
            message: 'Пароль должен содержать не менее 4 символов',
          },
          validate: {
            noCyrillic: (value) =>
              /^[a-zA-Z0-9!@#$%^&*()_+=\-[\]{};':"\\|,.<>/?]+$/.test(value) ||
              'Используйте только латинские буквы и спецсимволы',
            hasNumber: (value) =>
              /\d/.test(value) || 'Пароль должен содержать хотя бы одну цифру',
            hasLetter: (value) =>
              /[a-zA-Z]/.test(value) ||
              'Пароль должен содержать хотя бы одну латинскую букву',
          },
        })}
      />
      <Checkbox
        id='use-condition-agreement'
        label='Соглашаюсь с условиями пользования'
        error={errors.policy}
        {...register('policy', {
          required: 'Условия должны быть приняты',
        })}
      />
      <Button type='submit'>Зарегистрироваться</Button>
    </form>
  );
}
