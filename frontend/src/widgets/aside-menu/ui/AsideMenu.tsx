'use client';

import { RefObject } from 'react';
import clsx from 'clsx';

import { NavProfile } from '@/features/dynamic-nav-profile';
import { SearchForm } from '@/features/search-form';

import { AccList } from './components/acc-list/AccList';
import { CategoriesList } from './components/categories-list/CategoriesList';
import { SocialMedia } from './components/social-media/SocialMedia';

interface AsideMenuProps {
  isOpen: boolean;
  asideRef: RefObject<HTMLElement | null>;
}

export function AsideMenu(props: AsideMenuProps) {
  const { isOpen, asideRef } = props;

  return (
    <aside
      id='aside-menu'
      inert={!isOpen}
      ref={asideRef}
      className={clsx(
        // initial
        'absolute right-0',
        'z-10 flex h-full w-screen flex-col gap-y-2.5 bg-white py-2.5 duration-200',
        !isOpen && 'translate-x-[calc(100%+1rem)]',
        isOpen && 'shadow-xl',
        'sm:w-fit',
        'lg:static lg:min-w-70 lg:translate-0 lg:py-10 lg:shadow-none',
      )}
    >
      <div className='flex flex-col gap-y-4 px-7.5'>
        <SearchForm className='max-w-full sm:min-w-80 lg:hidden' />
        <NavProfile
          classNameNav='block lg:hidden'
          classNameButtons='flex lg:hidden'
        />
        <h2 className='text-gray-80 text-[0.75rem] font-medium uppercase'>
          Меню
        </h2>
      </div>
      <nav className='*:not-last:border-b-gray-ea flex flex-col gap-y-7.5 *:not-last:border-b lg:pb-0'>
        <CategoriesList />
        <AccList />
      </nav>
      <SocialMedia />
    </aside>
  );
}
