import Link from 'next/link';

import { LoginForm } from '@/features/auth';

import { AppRouter } from '@/shared/config/app-router';

export default function Login() {
  return (
    <>
      <header className='flex flex-col gap-y-2 text-center'>
        <h2 className='text-2xl font-bold tracking-tight text-gray-900 md:text-3xl'>
          С возвращением!
        </h2>
        <p className='text-sm text-gray-500 md:text-base'>
          Введите свои данные, чтобы войти в систему
        </p>
      </header>

      <main className='mt-2 flex flex-col items-center'>
        <LoginForm />
      </main>

      <footer className='mt-4 flex flex-col gap-y-4 border-t border-t-gray-100 pt-6 text-center'>
        <p className='text-sm text-gray-500'>
          Нет аккаунта?{' '}
          <Link
            href={AppRouter.registration}
            className='font-semibold text-blue-600 transition-colors hover:text-blue-700'
          >
            Создать профиль
          </Link>
        </p>
      </footer>
    </>
  );
}
