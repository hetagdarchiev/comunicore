'use client';

import Link from 'next/link';

import { useAuth } from '@/shared/hooks/useAuth';
import { CreateThreadEditor } from '@/widgets/create-thread-editor/ui';

export default function EditorPage() {
  const { isAuthenticated, isLoading } = useAuth();

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
    <main className='w-full py-2'>
      <section className='mx-auto flex w-full max-w-5xl flex-col gap-y-3'>
        <CreateThreadEditor />
      </section>
    </main>
  );
}
