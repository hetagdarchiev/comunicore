'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import clsx from 'clsx';

import { AuthButtons } from '@/features/auth-buttons';
import { ProfileActions } from '@/features/profile-actions';

import { userMeOptions } from '@/shared/api/generated/@tanstack/react-query.gen';
import logo from '@/shared/assets/images/logo.svg';
import { AppRouter } from '@/shared/config/app-router';
import {
  useMenuActions,
  useMenuIsOpen,
  useMenuRefs,
} from '@/shared/hooks/useMenu.selectors';
import { useModal } from '@/shared/hooks/useModal';
import { useWindowResize } from '@/shared/hooks/useWindowResize';
import { BurgerMenu } from '@/shared/ui/burger-menu';

export function Header() {
  const { data: user } = useQuery(userMeOptions());

  console.log(user);

  const isOpen = useMenuIsOpen();
  const setIsOpen = useMenuActions().setIsOpen;

  const { menuRef, burgerRef } = useMenuRefs();

  const { modalOpen, setModalOpen } = useModal(menuRef, burgerRef, {
    autoClose: true,
    closeByEsc: true,
    initialState: isOpen,
  });

  const { responsiveIsOpen, setResponsiveIsOpen } = useWindowResize(modalOpen);

  useEffect(() => {
    if (isOpen !== responsiveIsOpen) {
      setIsOpen(responsiveIsOpen);
      setModalOpen(responsiveIsOpen);
    }
  }, [responsiveIsOpen, isOpen, setIsOpen, setModalOpen]);

  return (
    <header className='bg-white'>
      <div
        className={clsx(
          'mx-auto grid max-w-360 grid-cols-2 items-center justify-between gap-x-5 gap-y-4 px-4 py-5',
          'lg:grid-cols-2 lg:px-17.5',
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
            className='min-w-18'
          />
        </Link>
        {!!user ? (
          <ProfileActions className='hidden lg:flex' />
        ) : (
          <AuthButtons className='hidden lg:flex' />
        )}
        <BurgerMenu
          isOpen={isOpen}
          setIsOpen={setResponsiveIsOpen}
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
