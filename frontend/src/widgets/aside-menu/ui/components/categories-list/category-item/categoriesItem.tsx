'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { Category } from '../../../../model/types/categories.interface';

export function CategoriesItem(props: { category: Category }) {
  const { title, href, icon } = props.category;
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <li
      className={`text-gray-80 ${isActive ? 'text-orange-f4 bg-ligth-fc' : ''}`}
    >
      <Link
        href={href}
        className={`flex w-full items-center gap-x-3 px-7.5 py-3`}
      >
        <span className='h-5 w-5'>{icon}</span>
        <h3>{title}</h3>
      </Link>
    </li>
  );
}
