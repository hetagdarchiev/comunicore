<<<<<<< HEAD
export default function Home() {
  return <main className=''>main</main>;
=======
'use client';

import { PostList } from '@/widgets/post-list/post-list';

export default function Home() {
  return (
    <main className=''>
      <PostList />
    </main>
  );
>>>>>>> 443bfbb (Убрал скролл в body , добавил класс в глобальный стиль для скрола , сделал начальную логику и прорисовку данных в списке постов)
}
