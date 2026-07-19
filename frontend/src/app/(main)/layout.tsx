'use client';

import { ReactNode, useRef } from 'react';

import { Footer } from '@/widgets/footer';
import { BurgerMenu, Header } from '@/widgets/header';

import { selectStatus, useAuthStore } from '@/entities/session';

import { Loader } from '@/shared/ui';

export default function HomeLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const menuRef = useRef<HTMLElement | null>(null);

  const burgerRef = useRef<HTMLButtonElement | null>(null);

  const status = useAuthStore(selectStatus);

  console.log(status);

  if (status === 'loading') {
    return <Loader size='sm' className='my-auto' />;
  }

  return (
    <>
      <Header menuRef={menuRef} burgerRef={burgerRef} />
      <BurgerMenu menuRef={menuRef} />
      <main className='flex-1'>{children}</main>
      <Footer />
    </>
  );
}
