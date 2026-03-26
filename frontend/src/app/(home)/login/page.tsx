import { AuthForm } from '@/features/auth-form';

export default function Login() {
  return (
    <main className='flex-1 bg-white px-2.5 py-2.5'>
      <div className='flex flex-col gap-y-7.5'>
        <h2 className='text-4xl font-bold'>Вход в аккаунт</h2>
        <AuthForm />
      </div>
    </main>
  );
}
