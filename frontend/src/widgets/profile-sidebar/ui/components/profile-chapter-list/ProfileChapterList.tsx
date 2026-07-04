'use client';

import { HTMLAttributes } from 'react';

import { profileChapters } from '../../../model/data/profile-chapters';

import { ProfileChapterItem } from './ProfileChapterItem';

import { AppRouter } from '@/shared/config/app-router';
import { cn } from '@/shared/lib/classNames';
import { Tile } from '@/shared/ui';

export function ProfileChapterList(props: HTMLAttributes<HTMLDivElement>) {
  const hasUnreadNotifications = true;
  return (
    <Tile
      className={cn(
        'no-scrollbar overflow-hidden rounded-[0.625rem] max-xl:bg-transparent max-xl:p-0',
        props.className,
      )}
    >
      <ul className='flex xl:flex-col xl:gap-y-2.5'>
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
