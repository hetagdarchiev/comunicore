'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';

import { useLogoutMutation } from '@/entities/session';

import { userMeOptions } from '@/shared/api/generated/@tanstack/react-query.gen';
import { AppRouter } from '@/shared/config/app-router';
import { Button } from '@/shared/ui/button';
import { ErrorMessage } from '@/shared/ui/error-message';
import { ProfileAvatar } from '@/shared/ui/profile-avatar';

function ProfilePage() {
  const router = useRouter();

  const { data: user, isLoading } = useQuery(userMeOptions());

  const { mutate: logoutMutate, isPending, error } = useLogoutMutation();

  useEffect(() => {
    if (!isLoading && !user) {
      router.push(AppRouter.login);
    }
  }, [user, isLoading, router]);

  if (isLoading) return <p>Loading profile...</p>;
  if (!user) return null;

  return (
    // <main className='flex w-full flex-col gap-4 bg-white p-4'>
    <section className='bg-card flex flex-col p-6 shadow-sm'>
      <h1 className='mb-4 text-2xl font-bold'>Profile</h1>

      <ProfileAvatar
        authorName={user.name}
        avatarUrl={user.avatarUrl}
        width={50}
        height={50}
      />
      <div className='mb-6 space-y-2'>
        <p>
          <strong>Username:</strong> {user.name}
        </p>
        <p>
          <strong>Email:</strong> {user.email}
        </p>
      </div>

      <Button onClick={() => logoutMutate({})} disabled={isPending}>
        {isPending ? 'Logging out...' : 'Logout'}
      </Button>

      {error && <ErrorMessage error={error.message} className='mt-4' />}
    </section>
    // </main>
  );
}

export default ProfilePage;
