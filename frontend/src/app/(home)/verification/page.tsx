'use client';

import { Suspense } from 'react';

import { VerificationBody } from '@/widgets/VerificationBody';

function Verification() {
  return (
    <main className='flex-1 bg-white px-2.5 py-2.5'>
      <Suspense fallback={<div>Загрузка...</div>}>
        <VerificationBody />
      </Suspense>
    </main>
  );
}

export default Verification;
