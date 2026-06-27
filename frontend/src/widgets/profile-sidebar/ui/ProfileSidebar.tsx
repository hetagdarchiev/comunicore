import { ProfileChapterList } from './components/profile-chapter-list/ProfileChapterList';

import {
  ProfileAchivements,
  ProfileUserInfo,
  type User,
} from '@/entities/user';

export function ProfileSidebar(props: { user: User }) {
  const { createdAt, lastActivity, role, location, webSite, achievements } =
    props.user;
  return (
    <div className='flex flex-col gap-3.75'>
      <ProfileChapterList />
      <ProfileUserInfo
        role={role}
        createdAt={createdAt}
        lastActivity={lastActivity}
        webSite={webSite}
        location={location}
      />
      <ProfileAchivements achievements={achievements} />
    </div>
  );
}
