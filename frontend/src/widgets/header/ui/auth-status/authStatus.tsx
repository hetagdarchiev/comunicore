'use client';

import { useAuth } from '@/shared/hooks/useAuth';

import { Buttons } from '../buttons/buttons';
import { NavList } from '../navList/navList';

export function AuthStatus() {
  const { isAuthenticated, isLoading, logout } = useAuth();

  if (isLoading) {
    return (
      <span className='w-40 text-center text-sm text-gray-400'>
        Загрузка...
      </span>
    );
  }

  if (isAuthenticated) return <NavList logoutHandler={logout} />;

  return <Buttons />;
}
