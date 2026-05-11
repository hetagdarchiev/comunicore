import { PostList } from '@/features/post-list';

export default function Home() {
  return (
    <main className='flex flex-1 flex-col overflow-y-hidden'>
      <PostList />
    </main>
  );
}
