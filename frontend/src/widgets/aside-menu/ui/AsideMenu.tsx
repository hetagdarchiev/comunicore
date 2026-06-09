'use client';

import { RefObject } from 'react';

import { cn } from '@/shared/lib/classNames';

import { AccList } from './components/acc-list/AccList';
import { CategoriesList } from './components/categories-list/CategoriesList';
import { SocialMedia } from './components/social-media/SocialMedia';

import { useMenuIsOpen } from '@/shared/hooks/useMenu.selectors';

interface AsideMenuProps {
  menuRef: RefObject<HTMLElement | null>;
}

export function AsideMenu({ menuRef }: AsideMenuProps) {
  const isOpen = useMenuIsOpen();
  return (
    <aside
      id='aside-menu'
      inert={!isOpen}
      ref={menuRef}
      className={cn(
        // initial
        'absolute right-0',
        'z-10 flex h-full w-screen flex-col gap-y-2.5 bg-white py-2.5 duration-200',
        !isOpen && 'translate-x-[calc(100%+1rem)]',
        isOpen && 'shadow-xl',
        'sm:w-fit sm:min-w-95',
        'lg:static lg:min-w-70 lg:translate-0 lg:py-10 lg:shadow-none',
      )}
    >
      <h2 className='text-gray-80 px-7.5 text-[0.75rem] font-medium uppercase'>
        Меню
      </h2>
      <nav className='*:not-last:border-b-gray-ea flex flex-col gap-y-7.5 *:not-last:border-b lg:pb-0'>
        <CategoriesList />
        <AccList />
      </nav>
      <SocialMedia />
    </aside>
  );
}
