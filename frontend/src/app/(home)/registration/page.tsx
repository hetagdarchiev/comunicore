import { RegistrationForm } from '@/features/registration-form';

export default function Registration() {
  return (
    <main className='flex-1 bg-white px-2.5 py-2.5'>
      <div className='flex flex-col gap-y-7'>
        <h2 className='text-4xl font-bold'>Создать аккаунт</h2>
        <RegistrationForm />
      </div>
    </main>
  );
}
