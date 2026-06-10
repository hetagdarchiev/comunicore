'use client';

import { ReactNode, useRef } from 'react';

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
      <main>{children}</main>
    </>
  );
}
