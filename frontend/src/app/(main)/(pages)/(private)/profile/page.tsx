'use client';

import { useEffect } from 'react';
import { MdEdit } from 'react-icons/md';
import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';

import { PostCard } from '@/entities/post';
import { useLogoutMutation } from '@/entities/session';

import { userMeOptions } from '@/shared/api/generated/@tanstack/react-query.gen';
import { AppRouter } from '@/shared/config/app-router';
import { ProfileAvatar } from '@/shared/ui';
import { Button } from '@/shared/ui/Button';

export default function Profile() {
  const router = useRouter();
  const { data: user, isLoading } = useQuery(userMeOptions());
  const { mutate: logout } = useLogoutMutation();

  useEffect(() => {
    if (!isLoading && !user) {
      router.push(AppRouter.login);
    }
  }, [user, isLoading, router]);

  if (isLoading) return <p>Loading profile...</p>;
  if (!user) return null;

  const { id, name, email, avatarUrl } = user;

  return (
    <main className='flex-1 bg-white px-2.5 py-2.5'>
      <div className='flex flex-col gap-y-7.5'>
        <div className='flex gap-x-2.5'>
          <div className='flex flex-col items-center gap-y-2.5 px-7.5 py-4.25'>
            <ProfileAvatar
              width={100}
              height={100}
              authorName={name}
              avatarUrl={avatarUrl || undefined}
            />
            <Button className='gap-x-2.5'>Изменить</Button>
          </div>
          <div className='flex flex-col gap-y-5'>
            <h2 className='text-4xl font-bold'>{name}</h2>
            <div className='flex flex-col gap-y-2.5'>
              <p className='flex gap-x-2'>
                <span className='font-bold'>User ID:</span>
                {id}
              </p>
              <p className='flex gap-x-2'>
                <span className='font-bold'>ФИО:</span>
                {name}
              </p>
              <p className='flex gap-x-2'>
                <span className='font-bold'>Почта:</span>
                {email}
              </p>
              <p className='flex gap-x-2'>
                <span className='font-bold'>Зарегистрирован::</span>
                25.05.2025
              </p>
              <p className='flex gap-x-2'>
                <span className='font-bold'>Ранг:</span>
                Рядовой форумчанин
              </p>
            </div>
            <Button
              className='gap-x-2.5'
              href={AppRouter.profileEdit}
              size='lg'
            >
              <MdEdit size={24} />
              Редактировать
            </Button>
            <Button onClick={logout} className='gap-x-2.5'>
              Выйти
            </Button>
          </div>
        </div>
        <div className='flex flex-col gap-y-5'>
          <h3 className='text-[32px] font-bold'>Мои посты</h3>
          <ul className='flex flex-col gap-y-5'>
            <li>
              <PostCard
                post={{
                  id,
                  answers: 142,
                  authorName: name,
                  avatarUrl,
                  createdAt: 'Fri May 15 2026 21:48:40 GMT+0500',
                  chapter: 'Design',
                  title: 'Делаю проект на Vue. Дайте совет',
                  views: 42314,
                }}
              />
            </li>
          </ul>
        </div>
      </div>
    </main>
  );
}
