import clsx from 'clsx';

import { AsideMenu } from '@/widgets/aside-menu';
import { Header } from '@/widgets/header';

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <div
        className={clsx(
          'relative mx-auto flex h-8/10 w-full max-w-360 flex-1 gap-x-5 px-4',
          'lg:px-17.5',
        )}
      >
        <AsideMenu />
        {children}
      </div>
    </>
  );
}
