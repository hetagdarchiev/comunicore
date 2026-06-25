import { ProfileAchivements } from '../profile-achievements/ProfileAchivements';
import { ProfileChapterList } from '../profile-chapter-list/ProfileChapterList';
import { DashboardUserInfo } from '../user-info/DashboardUserInfo';

import { User } from '@/entities/user';

export function ProfileSidebar(user: User) {
  const { createdAt, lastActivity, role, location, webSite, achievements } =
    user;
  return (
    <div className='flex flex-col gap-3.75'>
      <ProfileChapterList />
      <DashboardUserInfo
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
