'use client';

import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';

import { SearchForm } from '@/features/search-form';
import logo from '@/shared/assets/images/logo.svg';

const DynamicAuthStatus = dynamic(
  () => import('./auth-status/authStatus').then((mod) => mod.AuthStatus),
  {
    ssr: false,
    loading: () => <div className='w-40' />,
  },
);

export function Header() {
  return (
    <header className='bg-white'>
      <div className='mx-auto flex max-w-360 items-center justify-between gap-x-5 px-17.5 py-6.25'>
        <h1 className='visually-hidden'>Comunicore</h1>
        <Link href={'/'} className='flex h-10 w-55'>
          <Image
            src={logo}
            alt='Logo'
            width={220}
            height={40}
            loading='eager'
            fetchPriority='high'
            className='min-w-37.5'
          />
        </Link>
        <SearchForm />
        <DynamicAuthStatus />
      </div>
    </header>
  );
}
