'use client';

import { FormEvent, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { TextEditor } from '@/features/text-editor';
import { threadCreateMutation } from '@/shared/api/generated/@tanstack/react-query.gen';
import { useAuth } from '@/shared/hooks/useAuth';
import { ErrorMessage } from '@/shared/ui/ErrorMessage';
import { Input } from '@/shared/ui/Input';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const TITLE_MAX_LENGTH = 120;

export default function EditorPage() {
  const [title, setTitle] = useState('');
  const [localError, setLocalError] = useState('');
  const queryClient = useQueryClient();
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAuth();

  const { mutateAsync, isPending } = useMutation(threadCreateMutation());

  const handleSubmit = async (event: FormEvent<HTMLElement>) => {
    event.preventDefault();

    if (!isAuthenticated) {
      setLocalError(
        'Только авторизованные пользователи могут публиковать посты',
      );
      return;
    }

    const normalizedTitle = title.trim();
    const markdown = (
      document.getElementById('markdown-editor') as HTMLTextAreaElement | null
    )?.value;

    if (!normalizedTitle) {
      setLocalError('Введите заголовок поста');
      return;
    }

    if (!markdown?.trim()) {
      setLocalError('Добавьте текст поста');
      return;
    }

    setLocalError('');

    try {
      const createdThread = await mutateAsync({
        body: {
          title: normalizedTitle,
          content: markdown,
        },
      });

      await queryClient.invalidateQueries({
        predicate: (query) => {
          const firstKey = query.queryKey[0];
          return (
            typeof firstKey === 'object' &&
            firstKey !== null &&
            '_id' in firstKey &&
            firstKey._id === 'threadsList'
          );
        },
      });

      router.push(`/posts/${createdThread.id}`);
    } catch {
      setLocalError('Не удалось опубликовать пост. Попробуйте снова.');
    }
  };

  if (isLoading) {
    return (
      <main className='w-full py-2'>
        <section className='mx-auto flex w-full max-w-5xl flex-col gap-y-3'>
          <p className='text-gray-80'>Проверяем авторизацию...</p>
        </section>
      </main>
    );
  }

  if (!isAuthenticated) {
    return (
      <main className='w-full py-2'>
        <section className='mx-auto flex w-full max-w-5xl flex-col gap-y-3'>
          <h1 className='text-2xl font-bold'>Публикация постов недоступна</h1>
          <p className='text-gray-80'>
            Чтобы создавать посты, войдите в аккаунт или зарегистрируйтесь.
          </p>
          <div className='flex gap-3'>
            <Link
              href='/login'
              className='bg-blue-16 hover:bg-blue-20 inline-flex w-fit items-center justify-center rounded-md px-5 py-3 text-center font-bold text-white duration-200'
            >
              Войти
            </Link>
            <Link
              href='/registration'
              className='bg-blue-16 hover:bg-blue-20 inline-flex w-fit items-center justify-center rounded-md px-5 py-3 text-center font-bold text-white duration-200'
            >
              Регистрация
            </Link>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className='w-full py-2' onSubmitCapture={handleSubmit}>
      <section className='mx-auto flex w-full max-w-5xl flex-col gap-y-3'>
        <Input
          name='thread-title'
          icon={''}
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder='Заголовок поста'
          maxLength={TITLE_MAX_LENGTH}
          disabled={isPending}
        />
        {localError && <ErrorMessage error={localError} />}
        <TextEditor />
      </section>
    </main>
  );
}
