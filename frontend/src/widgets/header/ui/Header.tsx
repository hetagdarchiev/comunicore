'use client';

import { Dispatch, RefObject, SetStateAction } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import clsx from 'clsx';

import { NavProfile } from '@/features/dynamic-nav-profile';
import { SearchForm } from '@/features/search-form';
import logo from '@/shared/assets/images/logo.svg';
import { AppRouter } from '@/shared/config/app-router';
import { BurgerMenu } from '@/shared/ui/burger-menu';

interface HeaderProps {
  isOpen: boolean;
  burgerRef: RefObject<HTMLButtonElement | null>;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export function Header(props: HeaderProps) {
  const { isOpen, setIsOpen, burgerRef } = props;
  return (
    <header className='bg-white'>
      <div
        className={clsx(
          'mx-auto grid max-w-360 grid-cols-2 items-center justify-between gap-x-5 gap-y-4 px-4 py-6.25',
          'lg:grid-cols-[1fr_500px_1fr] lg:px-17.5',
        )}
      >
        <h1 className='visually-hidden'>Comunicore</h1>
        <Link href={AppRouter.main} className='flex w-fit lg:w-full'>
          <Image
            src={logo}
            alt='Logo'
            width={40}
            height={40}
            loading='eager'
            fetchPriority='high'
            className='min-w-20'
          />
        </Link>
        <SearchForm className='hidden lg:flex' />
        <NavProfile
          classNameNav='hidden lg:block'
          classNameButtons='hidden lg:flex'
        />
        <BurgerMenu
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          ref={burgerRef}
          controls='aside-menu'
          className={clsx(
            'h-7.5 w-10 justify-self-end **:duration-200 lg:hidden',
            isOpen &&
              '**:relative **:first:top-1 **:first:rotate-45 **:nth-2:bottom-1 **:nth-2:rotate-135 **:nth-[n+3]:hidden',
            // Burger lines styles
            '**:bg-blue-77 **:h-1.25 **:last:relative **:last:-right-5 **:last:w-2/4',
            // Click zone styles
            'before:absolute before:inset-0 before:size-12.5 before:content-[""]',
          )}
        />
      </div>
    </header>
  );
}
