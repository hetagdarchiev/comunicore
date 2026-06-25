'use client';

import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import * as z from 'zod';

import {
  userMeOptions,
  userMeQueryKey,
  userUpdateMutation,
} from '@/shared/api/generated/@tanstack/react-query.gen';
import { AppRouter } from '@/shared/config/app-router';
import { getErrorMessage } from '@/shared/lib/helpers/getErrorMessage';
import { passwordSchema } from '@/shared/lib/schemas/password.schema';
import {
  Button,
  ErrorMessage,
  Input,
  Label,
  Loader,
  ProfileAvatar,
} from '@/shared/ui';

const optionalPasswordSchema = z.union([z.literal(''), passwordSchema]);

const profileEditSchema = z.object({
  name: z.string().trim().max(50, { message: 'Имя слишком длинное' }),
  email: z
    .string()
    .trim()
    .toLowerCase()
    .refine((email) => !email || z.string().email().safeParse(email).success, {
      message: 'Неверный формат почты',
    }),
  password: optionalPasswordSchema,
});

type ProfileEditForm = z.infer<typeof profileEditSchema>;

const defaultValues: ProfileEditForm = {
  name: '',
  email: '',
  password: '',
};

export default function ProfileEdit() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { data: user, isLoading } = useQuery(userMeOptions());

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProfileEditForm>({
    resolver: zodResolver(profileEditSchema),
    mode: 'onSubmit',
    defaultValues,
  });

  const {
    mutate: updateUser,
    error,
    isPending,
  } = useMutation({
    ...userUpdateMutation(),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: userMeQueryKey() });
      router.push(AppRouter.profile.root);
    },
  });

  useEffect(() => {
    if (!isLoading && !user) {
      router.push(AppRouter.login);
    }
  }, [user, isLoading, router]);

  useEffect(() => {
    if (user) {
      reset(defaultValues);
    }
  }, [reset, user]);

  const onSubmit: SubmitHandler<ProfileEditForm> = (data) => {
    if (!user) return;

    updateUser({
      path: { userId: user.id },
      body: {
        name: data.name || user.name,
        email: data.email || user.email,
        password: data.password,
      },
    });
  };

  if (isLoading) return <Loader />;
  if (!user) return null;

  return (
    <div className='px-2.5 py-2.5'>
      <div className='flex flex-col gap-y-5 sm:flex-row sm:gap-x-12'>
        <div className='flex w-full max-w-42 flex-col items-center gap-y-2.5 sm:px-7.5 sm:py-4.25'>
          <ProfileAvatar
            width={100}
            height={100}
            authorName={user.name}
            avatarUrl={user.avatarUrl || undefined}
          />
          <Button className='gap-x-2.5'>Изменить</Button>
        </div>

        <form
          className='flex w-full max-w-190 flex-col gap-y-3 pt-3 sm:pt-5'
          onSubmit={handleSubmit(onSubmit)}
        >
          <Label
            htmlFor='profile-name'
            error={errors.name}
            className='flex-col items-start gap-y-1 bg-transparent px-0 py-0 focus-within:ring-0'
          >
            <span className='font-bold'>Имя</span>
            <Input
              id='profile-name'
              className='bg-light-fc text-gray-80 px-4 py-2'
              isError={errors.name?.message}
              placeholder={user.name}
              {...register('name')}
            />
          </Label>

          <Label
            htmlFor='profile-email'
            error={errors.email}
            className='flex-col items-start gap-y-1 bg-transparent px-0 py-0 focus-within:ring-0'
          >
            <span className='font-bold'>Email</span>
            <Input
              id='profile-email'
              className='bg-light-fc text-gray-80 px-4 py-2'
              isError={errors.email?.message}
              placeholder={user.email || 'Email'}
              {...register('email')}
            />
          </Label>

          <Label
            htmlFor='profile-password'
            error={errors.password}
            className='flex-col items-start gap-y-1 bg-transparent px-0 py-0 focus-within:ring-0'
          >
            <span className='font-bold'>Пароль</span>
            <Input
              id='profile-password'
              type='password'
              className='bg-light-fc text-gray-80 px-4 py-2'
              isError={errors.password?.message}
              placeholder='Новый пароль'
              autoComplete='new-password'
              {...register('password')}
            />
          </Label>

          <div className='mt-1 flex flex-wrap gap-2.5'>
            <Button type='submit' disabled={isPending} className='gap-x-2.5'>
              {isPending ? 'Сохранение...' : 'Сохранить'}
            </Button>
            <Button href={AppRouter.profile.root}>Отмена</Button>
          </div>

          {error && (
            <ErrorMessage
              error={
                error instanceof Error
                  ? error.message
                  : getErrorMessage(error as never)
              }
            />
          )}
        </form>
      </div>
    </div>
  );
}
