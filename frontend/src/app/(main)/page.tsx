import { PostList } from '@/features/post-list';
import { SearchForm } from '@/features/search-form';

export default function Home() {
  return (
    <div className='px-4 pt-5'>
      <SearchForm className='bg-white' />
      <PostList />
    </div>
  );
}
