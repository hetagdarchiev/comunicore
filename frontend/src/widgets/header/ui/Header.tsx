'use client';

import { RefObject, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import clsx from 'clsx';

import { AuthButtons } from '@/features/auth-buttons';
import { ProfileActions } from '@/features/profile-actions';

import {
  selectIsAuthenticated,
  selectStatus,
  useAuthStore,
} from '@/entities/session';

import logo from '@/shared/assets/images/logo.svg';
import { AppRouter } from '@/shared/config/app-router';
import {
  useMenuActions,
  useMenuIsOpen,
} from '@/shared/hooks/useMenu.selectors';
import { useModal } from '@/shared/hooks/useModal';
import { useWindowResize } from '@/shared/hooks/useWindowResize';
import { BurgerMenu } from '@/shared/ui/burger-menu';
import { Skeleton } from '@/shared/ui/skeleton/Skeleton';

interface HeaderProps {
  menuRef: RefObject<HTMLElement | null>;
  burgerRef: RefObject<HTMLButtonElement | null>;
}

export function Header(props: HeaderProps) {
  const { menuRef, burgerRef } = props;
  const isAuthenticated = useAuthStore(selectIsAuthenticated);
  const status = useAuthStore(selectStatus);

  const isLoading = status === 'loading';

  const isOpen = useMenuIsOpen();
  const setIsOpen = useMenuActions().setIsOpen;

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
    <header className='bg-white px-4 py-5 lg:px-17.5'>
      <div
        className={clsx(
          'flex max-w-360 items-center justify-between gap-x-5 gap-y-4',
        )}
      >
        <h1 className='visually-hidden'>Communicore</h1>
        <Link href={AppRouter.main} className='flex w-fit'>
          <Image
            src={logo}
            alt='Logo'
            width={228}
            height={40}
            loading='eager'
            fetchPriority='high'
            className='min-w-18'
          />
        </Link>

        {isLoading ? (
          <div className='hidden gap-x-2.5 lg:flex'>
            <Skeleton isLoading={isLoading}>
              <div className='h-10 w-40' />
            </Skeleton>
          </div>
        ) : isAuthenticated ? (
          <ProfileActions className='hidden lg:flex' />
        ) : (
          <AuthButtons className='hidden lg:flex' />
        )}

        <BurgerMenu
          isOpen={isOpen}
          setIsOpen={isLoading ? () => {} : setResponsiveIsOpen}
          ref={burgerRef}
          controls='aside-menu'
          disabled={isLoading}
          aria-disabled={isLoading}
          className={clsx(
            'h-7.5 w-10 justify-self-end **:duration-200 lg:hidden',
            isLoading && 'pointer-events-none opacity-40',
            isOpen &&
              '**:relative **:first:top-1 **:first:rotate-45 **:nth-2:bottom-1 **:nth-2:rotate-135 **:nth-[n+3]:hidden',
            '**:bg-blue-77 **:h-1.25 **:last:relative **:last:-right-5 **:last:w-2/4',
            'before:absolute before:inset-0 before:size-12.5 before:content-[""]',
          )}
        />
      </div>
    </header>
  );
}
