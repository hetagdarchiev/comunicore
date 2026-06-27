'use client';

import { ProfileHero } from '@/widgets/profile-hero';
import { ProfileSidebar } from '@/widgets/profile-sidebar';
import { ProfileStats } from '@/widgets/profile-stats';

import { ProfileDashboard } from '@/features/profile-dashboard';

import { useUser } from '@/entities/user';

import { Container } from '@/shared/ui';

export default function Profile() {
  const { user, error, isLoading } = useUser();

  if (isLoading || !user) {
    return (
      <Container className='flex items-center justify-center py-24'>
        <div>Загрузка профиля...</div>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className='flex items-center justify-center py-24'>
        <div>{error.message}</div>
      </Container>
    );
  }

  return (
    <Container className='flex flex-col gap-y-12.5 py-12.5'>
      <ProfileHero user={user} />
      <ProfileStats
        bookMarks={user.bookMarks}
        likes={user.likes}
        rank={user.rank}
        threadsQuantity={user.threadsQuantity}
        recivedLikes={user.recivedLikes}
      />
      <section className='grid grid-cols-[minmax(0,34rem)_1fr] gap-x-2.5'>
        <ProfileSidebar user={user} />

        <ProfileDashboard userId={user.id} />
      </section>
    </Container>
  );
}
