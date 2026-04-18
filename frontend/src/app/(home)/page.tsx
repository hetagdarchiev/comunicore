'use client';

import Link from 'next/link';

import { useAuth } from '@/shared/hooks/useAuth';
import { PostList } from '@/widgets/post-list';
import { AppRouter } from '@/shared/config/app-router';

export default function Home() {
  const { isAuthenticated } = useAuth();
  return (
    <main className='grow'>
      {isAuthenticated && <Link href={AppRouter.editor}>Text editor</Link>}
      <PostList />
    </main>
  );
}
