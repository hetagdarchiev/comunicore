'use client';

import { ReactNode, useRef } from 'react';

import { Footer } from '@/widgets/footer';
import { Header } from '@/widgets/header';

export default function HomeLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const menuRef = useRef<HTMLElement | null>(null);

  const burgerRef = useRef<HTMLButtonElement | null>(null);

  return (
    <>
      <Header menuRef={menuRef} burgerRef={burgerRef} />
      <main className='flex-1'>{children}</main>
      <Footer />
    </>
  );
}
