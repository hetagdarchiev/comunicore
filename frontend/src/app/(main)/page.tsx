import { PostList } from '@/features/post-list';
import { SearchForm } from '@/features/search-form';

export default function Home() {
  return (
    <main className='flex flex-1 flex-col overflow-y-hidden pt-5'>
      <SearchForm className='bg-white' />
      <PostList />
    </main>
  );
}
