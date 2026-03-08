import { PostCard } from '@/entities/post/index';

export default function Home() {
  return (
    <main className=''>
      <PostCard
        author_name='Katya'
        avatarUrl='https://png.pngtree.com/thumb_back/fh260/background/20230516/pngtree-avatar-of-a-man-wearing-sunglasses-image_2569096.jpg'
        timeAgo='5 минут назад'
        title='Нужна помощь с API. Кто поможет?'
        description='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis placerat dolor quis massa commodo, tempor commodo risus finibus. Maecenas molestie, velit a faucibus vestibulum, elit lorem blandit massa, tincidunt lobortis mauris arcu nec leo. Donec id venenatis leo. Maecenas fringilla, enim a feugiat sodales, est dolor auctor turpis, at curs dolor sit amet, consectetur adipiscing elit. Duis placerat dolor quis massa commodo, tempor commodo risus finibus. Maecenas molestie, velit a faucibus vestibulum, elit lorem blandit massa, tincidunt lobortis mauris arcu nec leo. Donec id venenatis leo. Maecenas fringilla, enim a feugiat sodales, est dolor auctor turpis, at cursus mi ligula sed dolor. Donec dignissim ut dolor quis molestie. Etiam eget finibus eros. Duis dapibus neque magna, sed blandit sem aliquet sed.'
        tags={[
          'frontend',
          'API',
          'советы',
          'frontend',
          'API',
          'советы',
          'frontend',
          'API',
          'советы',
          'frontend',
          'API',
          'советы',
          'frontend',
          'API',
          'советы',
          'frontend',
          'API',
          'советы',
          'frontend',
          'API',
          'советы',
          'frontend',
          'API',
          'советы',
        ]}
        post_id={1}
        user_id={1}
        stats={{
          views: 12,
          comments: 4,
          likes: 155,
        }}
      />
    </main>
  );
}
