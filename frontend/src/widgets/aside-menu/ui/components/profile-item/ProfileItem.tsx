'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { cn } from '@/shared/lib/classNames';

import { AuthButtons } from '@/features/auth-buttons';

import { UserCreateResponse } from '@/shared/api/generated';
import { AppRouter } from '@/shared/config/app-router';
import { ProfileAvatar } from '@/shared/ui';

interface ProfileItemProps {
  user?: UserCreateResponse;
}

export function ProfileItem({ user }: ProfileItemProps) {
  const pathname = usePathname();

  const profileActive = pathname === AppRouter.profile;
  return (
    <>
      {!!user ? (
        <Link
          href={AppRouter.profile}
          className={cn(
            'text-gray-80 flex items-center gap-x-3 px-7.5 py-3',
            profileActive && 'bg-blue-77 text-white',
          )}
        >
          <ProfileAvatar
            authorName={user.name}
            avatarUrl={user.avatarUrl}
            width={20}
            height={20}
          />
          <h3>Профиль</h3>
        </Link>
      ) : (
        <AuthButtons />
      )}
    </>
  );
}
