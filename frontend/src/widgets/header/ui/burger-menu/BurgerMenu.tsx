'use client';

import { RefObject } from 'react';
import Link from 'next/link';

import { navLinks } from '../../model/navLinks';

import { AuthButtons } from '@/features/auth-buttons';
import { ProfileActions } from '@/features/profile-actions';

import { selectIsAuthenticated, useAuthStore } from '@/entities/session';

import { useMenuIsOpen } from '@/shared/hooks/useMenu.selectors';
import { cn } from '@/shared/lib/classNames';

interface BurgerMenuProps {
  menuRef: RefObject<HTMLElement | null>;
}

export function BurgerMenu({ menuRef }: BurgerMenuProps) {
  const isOpen = useMenuIsOpen();
  const isAuthenticated = useAuthStore(selectIsAuthenticated);

  return (
    <aside
      id='aside-menu'
      inert={!isOpen}
      ref={menuRef}
      className={cn(
        'fixed top-0 right-0 bottom-0 z-40',
        'bg-dark-0e flex w-screen flex-col gap-y-2.5 pt-24 pb-10 duration-300 ease-in-out',
        'after:absolute after:top-0 after:bottom-0 after:left-0 after:w-px after:bg-[linear-gradient(0deg,transparent,color-mix(in_srgb,var(--color-light)_15%,transparent),transparent)] after:content-[""]',
        !isOpen && 'translate-x-full',
        isOpen && 'shadow-xl',
        'sm:w-80',
        'lg:hidden',
      )}
    >
      <nav className='flex flex-col'>
        {navLinks.map((link) => (
          <Link
            key={link.label}
            href={link.href}
            className='hover:text-purple-67 px-8 py-4 text-xl font-medium text-white transition-colors hover:bg-white/5'
          >
            {link.label}
          </Link>
        ))}
      </nav>
      <div className='px-8 py-4'>
        {isAuthenticated ? <ProfileActions /> : <AuthButtons />}
      </div>
    </aside>
  );
}
