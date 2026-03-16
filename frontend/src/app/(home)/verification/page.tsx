'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

import { VerificationForm } from '@/features/verification-form';

function VerificationContent() {
  const searchParams = useSearchParams();
  const email = searchParams.get('email');

  return (
    <main className='flex-1 bg-white px-2.5 py-2.5'>
      <div className='flex flex-col gap-y-5'>
        <h2 className='text-4xl font-bold'>Подтверждение эл. почты</h2>
        <VerificationForm email={email} />
      </div>
    </main>
  );
}

export default function Verification() {
  return (
    <Suspense fallback={<div>Загрузка...</div>}>
      <VerificationContent />
    </Suspense>
  );
}
