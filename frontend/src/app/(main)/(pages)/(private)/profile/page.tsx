import { ProfileDasboard } from '@/widgets/profile-dashboard';
import { ProfileHero } from '@/widgets/profile-hero';
import { ProfileStats } from '@/widgets/profile-stats';

import { User, type UserAchievement } from '@/entities/user';

import { Container } from '@/shared/ui';

const achievements: UserAchievement[] = [
  {
    id: 'one-hundred-likes',
    imageUrl: '/achievements/100-likes.png',
    name: 'One hundred likes',
  },
  {
    id: 'caps-lock',
    imageUrl: '/achievements/caps-lock.png',
    name: 'Caps Lock',
  },
  {
    id: 'seven-days',
    imageUrl: '/achievements/seven-days.png',
    name: 'Seven days',
  },
  {
    id: 'sociality',
    imageUrl: '/achievements/sociality.png',
    name: 'Sociality',
  },
];

const mockUser: User = {
  id: 'cdnnpc-mcdosv-csjf-mck',
  avatarUrl: null,
  profileBanerUrl: '/profile-baner.jpg',
  name: 'CodeMaster',
  userTag: '@CodeMaster',
  role: 'Сверх Администратор',
  description:
    'Люблю технологии, кофе и продуктивное обсуждения. пишу код, читаю книги, играю в игры и люблю сериальчики.',
  rank: 214,
  threadsQuantity: 24,
  likes: 1200,
  bookMarks: 7,
  lastActivity: '2026-06-24T08:45:00.000Z',
  webSite: 'https://CodeMaster.dev',
  location: { country: 'Россия', city: 'Москва' },
  achievements,
  recivedLikes: 1200032,
  createdAt: '2025-04-22T08:45:00.000Z',
};

export default function Profile() {
  return (
    <Container className='flex flex-col gap-y-12.5 py-12.5'>
      <ProfileHero {...mockUser} />
      <ProfileStats
        bookMarks={mockUser.bookMarks}
        likes={mockUser.likes}
        rank={mockUser.rank}
        threadsQuantity={mockUser.threadsQuantity}
        recivedLikes={mockUser.recivedLikes}
      />
      <ProfileDasboard user={mockUser} />
    </Container>
  );
}
