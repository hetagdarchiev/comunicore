'use client';

import Link from 'next/link';

import { useAuth } from '@/shared/hooks/useAuth';
import { PostList } from '@/widgets/post-list';

export default function Home() {
  const { isAuthenticated } = useAuth();
  return (
    <main className='grow'>
      <Link href={isAuthenticated ? '/editor' : '/registration'}>
        Text editor
      </Link>
      <PostList />
    </main>
  );
}
