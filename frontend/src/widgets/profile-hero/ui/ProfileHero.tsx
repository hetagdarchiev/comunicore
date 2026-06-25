import Image from 'next/image';
import Link from 'next/link';

import { ProfileHeroHeader } from './components/ProfileHeroHeader';

import { User } from '@/entities/user';

import { AppRouter } from '@/shared/config/app-router';
import { isApiUrl } from '@/shared/guards/isApiUrl.guard';
import { cn } from '@/shared/lib/classNames';
import { Button, ProfileAvatar } from '@/shared/ui';

export function ProfileHero(props: User) {
  const {
    avatarUrl,
    createdAt,
    description,
    name,
    profileBanerUrl,
    role,
    userTag,
  } = props;
  const banerUrl = isApiUrl(profileBanerUrl)
    ? profileBanerUrl
    : '/profile-baner.jpg';

  return (
    <section>
      <div
        className={cn(
          'relative flex items-center justify-center overflow-hidden rounded-[1.25rem] p-5',
          'lg:h-105',
          'xl:justify-start xl:px-10',
          '2xl:h-112.5 2xl:px-16.25',
        )}
      >
        <Image
          src={banerUrl}
          alt=''
          aria-hidden
          fill
          className='absolute -z-1 object-cover'
        />
        <div
          className={cn(
            'bg-dark-0e/70 flex w-full items-center rounded-[1.25rem]',
            'md:w-fit',
            'xl:gap-x-5',
          )}
        >
          <ProfileAvatar
            authorName={name}
            avatarUrl={avatarUrl}
            width={300}
            height={300}
            className={cn(
              'hidden size-60 object-contain py-8 pl-5',
              'md:flex',
              'xl:size-75 xl:p-6.25',
            )}
          />
          <div
            className={cn(
              'flex w-full flex-col gap-y-3.75 px-5 pt-2.5 pb-5',
              'md:gap-y-7.5',
            )}
          >
            <ProfileHeroHeader
              avatarUrl={avatarUrl}
              createdAt={createdAt}
              name={name}
              role={role}
              userTag={userTag}
            />

            <p className={cn('max-w-115 font-bold', 'xl:max-w-125')}>
              {description}
            </p>

            <div
              className={cn(
                'flex flex-col gap-y-2 *:w-full',
                'sm:flex-row sm:gap-x-2.5 sm:*:w-fit',
              )}
            >
              <Button
                href={AppRouter.profile.edit}
                color='purple'
                className='whitespace-nowrap'
              >
                Редактировать профиль
              </Button>
              <Link
                href={AppRouter.settings}
                className='border-purple-86 hover:text-purple-86 hover:border-purple-86/50 rounded-[0.3125rem] border-2 px-4 py-3.25 text-center duration-200'
              >
                Настройки
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
