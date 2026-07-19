'use client';

import { BsQuestionCircle } from 'react-icons/bs';
import { LuInbox, LuStar } from 'react-icons/lu';
import Link from 'next/link';
import clsx from 'clsx';

import { NavigationItem } from '../model/types/navigation-item.types';

import { selectIsAuthenticated, useAuthStore } from '@/entities/session';
import { useUser } from '@/entities/user';

import { AppRouter } from '@/shared/config/app-router';
import { ProfileAvatar } from '@/shared/ui';

const navigations = [
  {
    name: 'Notifications',
    Icon: LuInbox,
    href: AppRouter.notification,
  },
  {
    name: 'FAQ',
    Icon: BsQuestionCircle,
    href: AppRouter.faq,
  },
  {
    name: 'Favorites',
    Icon: LuStar,
    href: AppRouter.favorites,
  },
] satisfies NavigationItem[];

interface Props {
  className?: string;
}

export function ProfileActions({ className }: Props) {
  const isAuth = useAuthStore(selectIsAuthenticated);
  const { user } = useUser({ enabled: isAuth });

  const userData = user?.user;

  return (
    <nav className={clsx(className)}>
      <ul className='flex items-center gap-x-5'>
        {navigations.map(({ name, Icon, href }) => (
          <li key={name.toLowerCase()}>
            <Link href={href} aria-label={name} title={name}>
              <Icon
                aria-label={name}
                width={24}
                height={24}
                title={name}
                className='min-h-6 min-w-6'
              />
            </Link>
          </li>
        ))}
        <li className='size-6.25'>
          <Link
            href={AppRouter.profile.root}
            title={userData ? userData.name : 'user'}
          >
            <ProfileAvatar
              width={25}
              height={25}
              unoptimized
              authorName={userData ? userData.name : 'user'}
              avatarUrl={userData?.avatarUrl}
            />
          </Link>
        </li>
      </ul>
    </nav>
  );
}
