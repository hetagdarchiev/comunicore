'use client';

import { memo } from 'react';
import { usePathname } from 'next/navigation';

import { cn } from '@/shared/lib/classNames';
import { ListItemLinkWithIcon } from '@/shared/types/list-item-link.types';
import { Button } from '@/shared/ui';

interface ProfileChapterItemProps extends Omit<ListItemLinkWithIcon, 'id'> {
  hasNotifications?: boolean;
}

export const ProfileChapterItem = memo(
  ({
    href,
    icon: Icon,
    label,
    hasNotifications = false,
  }: ProfileChapterItemProps) => {
    const pathname = usePathname();
    const isActive = pathname === href;
    return (
      <li>
        <Button
          href={href}
          size='xl'
          aria-current={isActive ? 'page' : undefined}
          color='transparent'
          className={cn(
            'text-gray-9e flex justify-start gap-x-2.5',
            isActive && 'bg-purple-67/20 text-pink-d5 pointer-events-none',
          )}
        >
          <div
            className='relative inline-flex items-center justify-center'
            aria-hidden
          >
            <Icon width={15} height={17} />

            {hasNotifications && (
              <span className='bg-red-ff absolute -top-px right-0.5 size-1.25 rounded-full' />
            )}
          </div>
          <span>{label}</span>
          {hasNotifications && (
            <span className='sr-only'> — есть новые уведомления</span>
          )}
        </Button>
      </li>
    );
  },
);

ProfileChapterItem.displayName = 'profile-chapter-item';
