'use client';

import { PostCard } from '@/entities/post';

export default function Home() {
  return (
    <main className=''>
      <PostCard
        author_name={'James'}
        avatarUrl={'images/123.jpg'}
        timeAgo={'09.03.2025'}
        title={'Заголовок'}
        description={'Test 123 test 123 test 123'}
        tags={['Frontend', 'Help', 'FAQ']}
        user_id={12}
        post_id={12}
        isLiked={true}
        onLike={() => console.log('Liked!')}
        stats={{ views: 500, comments: 24, likes: 778 }}
      />
    </main>
  );
}
