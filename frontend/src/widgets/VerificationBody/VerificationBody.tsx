import { VerificationForm } from '@/features/verification-form';

type Props = {
  email: string | null;
};

export const VerificationBody = (props: Props) => {
  const { email } = props;

  return (
    <div className='flex flex-col gap-y-5'>
      <h2 className='text-4xl font-bold'>Подтверждение эл. почты</h2>
      <VerificationForm email={email} />
    </div>
  );
};
