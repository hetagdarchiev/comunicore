'use client';

import { SubmitHandler, useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import * as z from 'zod';

import lockIcon from '@/shared/assets/icons/form/lock.svg';
import mailIcon from '@/shared/assets/icons/form/mail.svg';
import userIcon from '@/shared/assets/icons/form/user.svg';
import { Button } from '@/shared/ui/Button';
import { Checkbox } from '@/shared/ui/Checkbox';
import { Input } from '@/shared/ui/Input';
import { zodResolver } from '@hookform/resolvers/zod';

// 1. Описываем схему валидации
const registerSchema = z.object({
  login: z.string().min(1, 'Введите логин'),
  email: z.string().min(1, 'Введите email').email('Неверный формат почты'),
  password: z
    .string()
    .min(4, 'Пароль должен содержать не менее 4 символов')
    .regex(/[a-zA-Z]/, 'Пароль должен содержать хотя бы одну латинскую букву')
    .regex(/\d/, 'Пароль должен содержать хотя бы одну цифру')
    .regex(
      /^[a-zA-Z0-9!@#$%^&*()_+=\-[\]{};':"\\|,.<>/?]+$/,
      'Используйте только латиницу и спецсимволы',
    ),
  policy: z.boolean().refine((val) => val, {
    message: 'Условия должны быть приняты',
  }),
});

// 2. Извлекаем тип из схемы автоматически
type TRegistrationForm = z.infer<typeof registerSchema>;

export function RegistrationForm() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<TRegistrationForm>({
    resolver: zodResolver(registerSchema), // Подключаем Zod
    mode: 'onBlur',
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
