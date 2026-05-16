'use client';

import { SubmitHandler, useForm } from 'react-hook-form';
import { LuAtSign, LuLock, LuUser } from 'react-icons/lu';
import { zodResolver } from '@hookform/resolvers/zod';

import { useRegistration } from '../../model/hooks/useRegistration';
import {
  registrationFormSchema,
  RegistrationFormTypes,
} from '../../model/schemas/registration-form.schema';

import { getErrorMessage } from '@/shared/lib/helpers/getErrorMessage';
import { Button } from '@/shared/ui/button';
import { Checkbox } from '@/shared/ui/checkbox';
import { ErrorMessage } from '@/shared/ui/error-message';
import { Input } from '@/shared/ui/input';
import { Label } from '@/shared/ui/label/Label';

const defaultValues = {
  name: '',
  email: '',
  password: '',
  policy: false,
};

export function RegistrationForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RegistrationFormTypes>({
    resolver: zodResolver(registrationFormSchema),
    mode: 'onSubmit',
    defaultValues,
  });

  const { mutate: registrationMutate, error, isPending } = useRegistration();

  const onSubmit: SubmitHandler<RegistrationFormTypes> = (data) => {
    registrationMutate(
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
      className='flex w-full max-w-125 flex-col gap-y-5'
      onSubmit={handleSubmit(onSubmit)}
    >
      <Label htmlFor='user-name' error={errors.name}>
        <LuUser size={24} aria-hidden={true} role='img' />
        <Input
          id='user-name'
          isError={errors.name?.message}
          placeholder='Имя'
          {...register('name')}
        />
      </Label>
      <Label htmlFor='user-email' error={errors.email}>
        <LuAtSign size={24} aria-hidden={true} role='img' />
        <Input
          id='user-email'
          isError={errors.email?.message}
          placeholder='Почта'
          {...register('email')}
        />
      </Label>
      <Label htmlFor='user-password' error={errors.password}>
        <LuLock size={24} aria-hidden={true} role='img' />
        <Input
          id='user-password'
          type='password'
          isError={errors.password?.message}
          placeholder='Пароль'
          {...register('password')}
        />
      </Label>
      <Checkbox
        id='use-condition-agreement'
        label='Соглашаюсь с условиями пользования'
        error={errors.policy}
        {...register('policy')}
      />

      <Button type='submit' disabled={isPending} className='w-full'>
        {isPending ? 'Загрузка...' : 'Зарегистрироваться'}
      </Button>

      {error && <ErrorMessage error={getErrorMessage(error)} />}
    </form>
  );
}
