import Link from 'next/link';

import { RegistrationForm } from '@/features/auth';

import { AppRouter } from '@/shared/config/app-router';

export default function Registration() {
  return (
    <>
      <header className='flex flex-col gap-y-2 text-center'>
        <h2 className='text-2xl font-bold tracking-tight text-gray-900 md:text-3xl'>
          Создать аккаунт
        </h2>
        <p className='text-sm text-gray-500 md:text-base'>
          Присоединяйтесь к нам, чтобы начать работу
        </p>
      </header>

      <main className='mt-2 flex flex-col items-center'>
        <RegistrationForm />
      </main>

      <footer className='mt-4 border-t border-t-gray-100 pt-6 text-center'>
        <p className='text-sm text-gray-400'>
          Уже есть профиль?{' '}
          <Link
            href={AppRouter.login}
            className='font-semibold text-blue-600 transition-colors hover:text-blue-700'
          >
            Войти
          </Link>
        </p>
      </footer>
    </>
  );
}
