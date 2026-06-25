import { ProfileContent } from './components/profile-content/ProfileContent';
import { ProfileSidebar } from './components/profile-sidebar/ProfileSidebar';

import { User } from '@/entities/user';

export function ProfileDasboard(props: { user: User }) {
  const { user } = props;
  return (
    <section className='grid grid-cols-[minmax(0,34rem)_1fr] gap-x-2.5'>
      <ProfileSidebar {...user} />
      <ProfileContent />
    </section>
  );
}
