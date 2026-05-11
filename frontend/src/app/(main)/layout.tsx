'use client';

import { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';

import { useModal } from '@/shared/hooks/useModal';
import { useWindowResize } from '@/shared/hooks/useWindowResize';
import { AsideMenu } from '@/widgets/aside-menu';
import { Header } from '@/widgets/header';

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const burgerAsideRef = useRef<HTMLButtonElement | null>(null);

  const asideRef = useRef<HTMLElement | null>(null);

  const { modalOpen, setModalOpen } = useModal(asideRef, burgerAsideRef, {
    autoClose: true,
    closeByEsc: true,
  });

  useEffect(() => {
    setModalOpen(isOpen);
  }, [isOpen, setModalOpen]);

  const { responsiveIsOpen } = useWindowResize(modalOpen);

  return (
    <>
      <Header
        isOpen={responsiveIsOpen}
        burgerRef={burgerAsideRef}
        setIsOpen={setIsOpen}
      />
      <div
        className={clsx(
          'relative mx-auto flex h-8/10 w-full max-w-360 flex-1 gap-x-5 px-4',
          'lg:px-17.5',
        )}
      >
        <AsideMenu asideRef={asideRef} isOpen={responsiveIsOpen} />
        {children}
      </div>
    </>
  );
}
