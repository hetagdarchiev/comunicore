'use client';

import { useRef } from 'react';
import clsx from 'clsx';

import { AsideMenu } from '@/widgets/aside-menu';
import { Header } from '@/widgets/header';

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const menuRef = useRef<HTMLElement | null>(null);

  const burgerRef = useRef<HTMLButtonElement | null>(null);
  return (
    <>
      <Header menuRef={menuRef} burgerRef={burgerRef} />
      <div
        className={clsx(
          'relative mx-auto flex h-8/10 w-full max-w-360 flex-1 gap-x-5 px-4',
          'lg:px-17.5',
        )}
      >
        <AsideMenu menuRef={menuRef} />
        {children}
      </div>
    </>
  );
}
