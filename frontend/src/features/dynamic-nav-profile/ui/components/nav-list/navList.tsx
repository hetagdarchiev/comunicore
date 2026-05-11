import { BsQuestionCircle } from 'react-icons/bs';
import { LuCircleUserRound, LuInbox, LuLogOut, LuStar } from 'react-icons/lu';
import Link from 'next/link';
import clsx from 'clsx';

import { AppRouter } from '@/shared/config/app-router';

import { NavigationItem } from '../../../model/types/navigation-item.types';

const navigations = [
  {
    name: 'Notifications',
    Icon: LuInbox,
    href: AppRouter.notification,
  },
  {
    name: 'Profile',
    Icon: LuCircleUserRound,
    href: AppRouter.profile,
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
  logoutHandler: () => void;
  className?: string;
}

export function NavList({ logoutHandler, className = '' }: Props) {
  return (
    <nav className={clsx('justify-self-end', className)}>
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
        <button type='button' onClick={logoutHandler}>
          <LuLogOut
            className='min-h-6 min-w-6'
            role='button'
            aria-label='Log out'
            title='Log out'
          />
        </button>
      </ul>
    </nav>
  );
}
