import Image from 'next/image';
import Link from 'next/link';

import faqIcon from '@/assets/icons/user-nav/faq.svg';
import favoritesIcon from '@/assets/icons/user-nav/favorites.svg';
import logoutIcon from '@/assets/icons/user-nav/logout.svg';
import notificationsIcon from '@/assets/icons/user-nav/notifications.svg';
import profileIcon from '@/assets/icons/user-nav/profile.svg';

const navigations = [
  {
    name: 'Notifications',
    icon: notificationsIcon,
    href: '/notifications',
  },
  {
    name: 'Profile',
    icon: profileIcon,
    href: '/profile',
  },
  {
    name: 'FAQ',
    icon: faqIcon,
    href: '/rules',
  },
  {
    name: 'Favorites',
    icon: favoritesIcon,
    href: '/favorites',
  },
];

interface Props {
  logoutHandler: () => void;
}

export function NavList({ logoutHandler }: Props) {
  return (
    <nav>
      <ul className='flex items-center gap-x-5'>
        {navigations.map((item) => (
          <li key={item.name.toLowerCase()}>
            <Link href={item.href} aria-label={item.name} title={item.name}>
              <Image
                src={item.icon}
                alt={item.name}
                width={24}
                height={24}
                className='min-w-5'
              />
            </Link>
          </li>
        ))}
        <button type='button' onClick={logoutHandler}>
          <Image src={logoutIcon} alt='Log out' />
        </button>
      </ul>
    </nav>
  );
}
