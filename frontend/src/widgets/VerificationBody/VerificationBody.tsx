import { useSearchParams } from 'next/navigation';

import { VerificationForm } from '@/features/verification-form';

export const VerificationBody = () => {
  const searchParams = useSearchParams();
  const email = searchParams.get('email');

  return (
    <div className='flex flex-col gap-y-5'>
      <h2 className='text-4xl font-bold'>Подтверждение эл. почты</h2>
      <VerificationForm email={email} />
    </div>
  );
};
