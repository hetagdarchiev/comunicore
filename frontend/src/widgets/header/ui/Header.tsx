'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { SearchForm } from '@/features/search-form';
import logo from '@/shared/assets/images/logo.svg';
import { useAuth } from '@/shared/hooks/useAuth';

import { Buttons } from './buttons';
import { NavList } from './navList';

export function Header() {
  const { isAuthenticated, isLoading } = useAuth();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMounted(true); // Заигнорил линтер, так как это единственный способ решить проблему гидратации
  }, []);

  const renderProfile = () => {
    if (!isMounted) return <div className='w-40' />; // Заглушка для гидратации

    if (isLoading) {
      return <span className='text-sm text-gray-400'>Загрузка...</span>;
    }

    if (isAuthenticated) {
      return <NavList />;
    }

    return <Buttons />;
  };

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
        {renderProfile()}
      </div>
    </header>
  );
}
