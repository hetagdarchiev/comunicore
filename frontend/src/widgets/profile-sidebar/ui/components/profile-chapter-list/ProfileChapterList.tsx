'use client';

import { profileChapters } from '../../../model/data/profile-chapters';

import { ProfileChapterItem } from './ProfileChapterItem';

import { AppRouter } from '@/shared/config/app-router';
import { Tile } from '@/shared/ui';

export function ProfileChapterList() {
  const hasUnreadNotifications = true;
  return (
    <Tile>
      <ul className='flex flex-col gap-y-2.5'>
        {profileChapters.map((item) => {
          const isNotificationTab = item.href === AppRouter.notification;

          return (
            <ProfileChapterItem
              key={item.id}
              {...item}
              hasNotifications={
                isNotificationTab ? hasUnreadNotifications : undefined
              }
            />
          );
        })}
      </ul>
    </Tile>
  );
}
