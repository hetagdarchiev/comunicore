'use client';

import { ReactNode, useRef } from 'react';

import { BurgerMenu } from '@/widgets/header/ui/burger-menu';
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
      <BurgerMenu menuRef={menuRef} />
      <main className='flex-1'>{children}</main>
      <Footer />
    </>
  );
}
