'use client';

import { ProfileHero } from '@/widgets/profile-hero';
import { ProfileChapterList, ProfileSidebar } from '@/widgets/profile-sidebar';
import { ProfileStats } from '@/widgets/profile-stats';

import { ProfileDashboard } from '@/features/profile-dashboard';

import { useUser } from '@/entities/user';

import { cn } from '@/shared/lib/classNames';
import { Container, Loader } from '@/shared/ui';

export default function Profile() {
  const { user, error, isLoading } = useUser();

  if (isLoading || !user) {
    return (
      <Container className='flex items-center justify-center py-24'>
        <Loader size='sm' />
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
      <section
        className={cn(
          'grid grid-cols-1 grid-rows-[auto_1fr_auto] gap-y-5',
          'xl:grid-cols-[auto_1fr] xl:gap-x-2.5',
        )}
      >
        <ProfileSidebar user={user} />
        <ProfileChapterList className='xl:hidden' />

        <ProfileDashboard userId={user.id} />
      </section>
    </Container>
  );
}
