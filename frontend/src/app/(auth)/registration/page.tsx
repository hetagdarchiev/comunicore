import { RegistrationForm } from '@/features/auth';

export default function Registration() {
  return (
    <>
      <header>
        <h2 className='text-4xl font-bold'>Создать аккаунт</h2>
      </header>
      <main className=''>
        <RegistrationForm />
      </main>
    </>
  );
}
