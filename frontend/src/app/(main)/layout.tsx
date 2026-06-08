'use client';

import { ReactNode, useRef } from 'react';

import { AsideMenu } from '@/widgets/aside-menu';
import { Header } from '@/widgets/header';

import { cn } from '@/shared/lib/classNames';

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
      <div
        className={cn(
          'relative mx-auto flex h-8/10 w-full max-w-360 flex-1 gap-x-5 overflow-x-hidden lg:px-5',
        )}
      >
        <AsideMenu menuRef={menuRef} />
        <main className='flex-1 overflow-y-hidden bg-white px-2.5 py-5'>
          {children}
        </main>
      </div>
    </>
  );
}
