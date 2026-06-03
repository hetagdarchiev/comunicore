import { PostList } from '@/features/post-list';
import { SearchForm } from '@/features/search-form';

export default function Home() {
  return (
    <>
      <SearchForm className='bg-white' />
      <PostList />
    </>
  );
}
