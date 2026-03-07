import { VerificationForm } from '@/features/verification-form';

export default function Verification() {
  return (
    <main className='flex-1 bg-white px-2.5 py-2.5'>
      <div className='flex flex-col gap-y-7'>
        <h2 className='text-4xl font-bold'>Подтверждение эл. почты</h2>
        <p>Введите код из письма, которые мы отправили на example@gmail.com</p>
        <VerificationForm />
      </div>
    </main>
  );
}
