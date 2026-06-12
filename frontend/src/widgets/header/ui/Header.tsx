'use client';

import { RefObject, useEffect } from 'react';
import { LuSearch } from 'react-icons/lu';
import Image from 'next/image';
import Link from 'next/link';

import { navLinks } from '../model/navLinks';

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
import { cn } from '@/shared/lib/classNames';
import { BurgerMenu, Container } from '@/shared/ui';

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
    <header className='bg-dark-0e relative z-50 py-2.5 after:absolute after:right-0 after:bottom-0 after:left-0 after:h-px after:bg-[linear-gradient(90deg,transparent,color-mix(in_srgb,var(--color-light)_15%,transparent),transparent)] after:content-[""]'>
      <Container className='flex items-center justify-between'>
        <h1 className='visually-hidden'>Communicore</h1>
        <Link href={AppRouter.main} className='flex w-fit'>
          <Image
            src={logo}
            alt='Logo'
            width={240}
            height={44}
            loading='eager'
            fetchPriority='high'
            className='min-w-18'
          />
        </Link>

        <nav className='[&_a:hover]:text-purple-67 hidden gap-x-5 text-[18px] font-medium lg:flex [&_a]:transition-colors'>
          {navLinks.map(({ label, href }) => (
            <Link key={label} href={href}>
              {label}
            </Link>
          ))}
        </nav>

        <div className='flex items-center gap-x-6.25'>
          <button>
            <LuSearch size={30} />
          </button>
          {isAuthenticated ? (
            <ProfileActions className='hidden lg:flex' />
          ) : (
            <AuthButtons className='hidden lg:flex' />
          )}
        </div>
        <BurgerMenu
          isOpen={isOpen}
          setIsOpen={isLoading ? () => {} : setResponsiveIsOpen}
          ref={burgerRef}
          controls='aside-menu'
          disabled={isLoading}
          aria-disabled={isLoading}
          className={cn(
            'h-7.5 w-10 justify-self-end **:duration-200 lg:hidden',
            isLoading && 'pointer-events-none opacity-40',
            isOpen &&
              '**:relative **:first:top-1 **:first:rotate-45 **:nth-2:bottom-1 **:nth-2:rotate-135 **:nth-[n+3]:hidden',
            '**:bg-purple-67 **:h-1.25 **:last:relative **:last:-right-5 **:last:w-2/4',
            'before:absolute before:inset-0 before:size-12.5 before:content-[""]',
          )}
        />
      </Container>
    </header>
  );
}
