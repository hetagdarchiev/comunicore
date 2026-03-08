import { PostCard } from '@/entities/post/ui/index';

export default function Home() {
  return (
    <main className=''>
      <PostCard
        author='Katya'
        avatarUrl='https://png.pngtree.com/thumb_back/fh260/background/20230516/pngtree-avatar-of-a-man-wearing-sunglasses-image_2569096.jpg'
        timeAgo='5 минут назад'
        title='Нужна помощь с API. Кто поможет?'
        description='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Consequat aliquet maecenas ut sit nulla'
        tags={['frontend', 'API', 'советы']}
        stats={{
          views: 129,
          comments: 4,
          likes: 155,
        }}
      />
    </main>
  );
}
