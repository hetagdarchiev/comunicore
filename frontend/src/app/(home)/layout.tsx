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
      <div className='mx-auto flex h-full w-full max-w-360 gap-x-5 px-17.5'>
        <AsideMenu />
        {children}
      </div>
    </>
  );
}
