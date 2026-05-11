'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

import { categories } from '../../../model/data/categories.data';

export function CategoriesList() {
  const pathname = usePathname();
  return (
    <ul className='flex flex-col gap-y-2.5'>
      {categories.map(({ Icon, href, title }) => {
        const isActive = pathname === href;

        return (
          <li
            key={title}
            className={clsx(
              'text-gray-80',
              isActive && 'text-orange-f4 bg-light-fc',
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
