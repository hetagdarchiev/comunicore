'use client';

import { RefObject, useEffect } from 'react';
import { LuSearch } from 'react-icons/lu';
import Image from 'next/image';
import Link from 'next/link';

import { navLinks } from '../model/navLinks';

import { Burger } from './burger/Burger';

import { AuthButtons } from '@/features/auth-buttons';
import { ProfileActions } from '@/features/profile-actions';

import { selectStatus, useAuthStore } from '@/entities/session';

import logo from '@/shared/assets/images/logo.svg';
import { AppRouter } from '@/shared/config/app-router';
import {
  useMenuActions,
  useMenuIsOpen,
} from '@/shared/hooks/useMenu.selectors';
import { useModal } from '@/shared/hooks/useModal';
import { useWindowResize } from '@/shared/hooks/useWindowResize';
import { cn } from '@/shared/lib/classNames';
import { Container } from '@/shared/ui';

interface HeaderProps {
  menuRef: RefObject<HTMLElement | null>;
  burgerRef: RefObject<HTMLButtonElement | null>;
}

export function Header(props: HeaderProps) {
  const { menuRef, burgerRef } = props;
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
    <header className='bg-dark-0e sticky top-0 z-50 w-full py-2.5 after:absolute after:right-0 after:bottom-0 after:left-0 after:h-px after:bg-[linear-gradient(90deg,transparent,color-mix(in_srgb,var(--color-light)_15%,transparent),transparent)] after:content-[""]'>
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
          <button title='Search' aria-label='Search button'>
            <LuSearch size={30} />
          </button>
          {status === 'authenticated' ? (
            <ProfileActions className='hidden lg:flex' />
          ) : (
            <AuthButtons className='hidden lg:flex' />
          )}
          <Burger
            isOpen={isOpen}
            setIsOpen={isLoading ? () => {} : setResponsiveIsOpen}
            ref={burgerRef}
            controls='aside-menu'
            disabled={isLoading}
            aria-disabled={isLoading}
            className={cn(
              'justify-self-end lg:hidden',
              isLoading && 'pointer-events-none opacity-40',
            )}
          />
        </div>
      </Container>
    </header>
  );
}
