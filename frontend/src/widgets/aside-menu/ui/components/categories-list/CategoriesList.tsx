'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { categories } from '../../../model/data/categories.data';
import { ProfileItem } from '../profile-item/ProfileItem';

import { useAuthMeQuery } from '@/entities/user';

import { cn } from '@/shared/lib/classNames';
import { Loader } from '@/shared/ui';

export function CategoriesList() {
  const pathname = usePathname();
  const { data: user, isPending } = useAuthMeQuery();
  return (
    <ul className='custom-scrollbar flex max-h-55.5 flex-col gap-y-2.5 overflow-auto'>
      <li className={cn('lg:hidden', !user && 'px-7.5 py-3')}>
        {isPending ? <Loader /> : <ProfileItem user={user} />}
      </li>
      {categories.map(({ Icon, href, title, isDeskHidden }) => {
        const isActive = pathname === href;

        return (
          <li
            key={title}
            className={cn(
              'text-gray-80',
              isActive && 'bg-blue-77 text-white',
              isDeskHidden && 'lg:hidden',
            )}
          >
            <Link
              href={href}
              className={`flex w-full items-center gap-x-3 px-7.5 py-3`}
            >
              <Icon
                width={20}
                height={20}
                role={'img'}
                aria-hidden={true}
                className='min-h-5 min-w-5'
              />
              <h3>{title}</h3>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
