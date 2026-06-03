import { Suspense } from 'react';
import { LuMailCheck } from 'react-icons/lu';
import Link from 'next/link';

import { VerificationBody } from '@/widgets/verification-body';

import { AppRouter } from '@/shared/config/app-router';

function Verification() {
  return (
    <>
      <div className='flex flex-col items-center gap-y-4 text-center'>
        <div className='flex h-16 w-16 items-center justify-center rounded-full bg-blue-50 text-blue-600'>
          <LuMailCheck size={32} />
        </div>
        <div className='space-y-1'>
          <h1 className='text-2xl font-bold tracking-tight text-gray-900 md:text-3xl'>
            Подтвердите почту
          </h1>
          <p className='mx-auto max-w-75 text-sm text-gray-500 md:text-base'>
            Мы отправили ссылку для активации на ваш адрес
          </p>
        </div>
      </div>

      <div className='mt-8'>
        <Suspense
          fallback={
            <div className='animate-pulse py-10 text-center text-gray-400'>
              Проверка...
            </div>
          }
        >
          <VerificationBody />
        </Suspense>
      </div>

      <div className='mt-10 border-t border-gray-100 pt-6 text-center'>
        <p className='text-xs leading-relaxed text-gray-400'>
          Не получили письмо? Проверьте папку <b>«Спам»</b> <br />
          или напишите в{' '}
          <Link
            href={AppRouter.support}
            className='text-blue-600 hover:underline'
          >
            поддержку
          </Link>
        </p>
      </div>
    </>
  );
}

export default Verification;
