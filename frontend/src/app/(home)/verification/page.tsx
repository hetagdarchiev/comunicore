'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

import { VerificationBody } from '@/widgets/VerificationBody';

function Verification() {
  const searchParams = useSearchParams();
  const email = searchParams.get('email');

  return (
    <main className='flex-1 bg-white px-2.5 py-2.5'>
      <Suspense fallback={<div>Загрузка...</div>}>
        <VerificationBody email={email} />
      </Suspense>
    </main>
  );
}

export default Verification;
