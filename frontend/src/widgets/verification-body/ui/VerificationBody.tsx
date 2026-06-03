'use client';

import { useRouter, useSearchParams } from 'next/navigation';

import { VerificationForm } from '@/features/auth';

import { AppRouter } from '@/shared/config/app-router';

const PARAM_EMAIL_KEY = 'email';

export const VerificationBody = () => {
  const searchParams = useSearchParams();
  const email = searchParams.get(PARAM_EMAIL_KEY);

  const router = useRouter();

  if (!email) {
    router.push(AppRouter.registration);
    return;
  }

  return (
    <section className='flex flex-col gap-y-5'>
      <VerificationForm email={email} />
    </section>
  );
};
