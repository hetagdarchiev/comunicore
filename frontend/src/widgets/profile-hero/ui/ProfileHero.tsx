import Image from 'next/image';
import Link from 'next/link';

import { ProfileHeroHeader } from './components/ProfileHeroHeader';

import { User } from '@/entities/user';

import { AppRouter } from '@/shared/config/app-router';
import { isApiUrl } from '@/shared/guards/isApiUrl.guard';
import { cn } from '@/shared/lib/classNames';
import { Button, ProfileAvatar } from '@/shared/ui';

export function ProfileHero(props: { user: User }) {
  const {
    avatarUrl,
    createdAt,
    description,
    name,
    profileBanerUrl,
    role,
    userTag,
  } = props.user;

  const banerUrl = isApiUrl(profileBanerUrl)
    ? profileBanerUrl
    : '/profile-baner.jpg';

  return (
    <section>
      <div
        className={cn(
          'relative flex items-center justify-center overflow-hidden rounded-[1.25rem]',
          'lg:h-105 lg:p-5',
          'xl:justify-start xl:px-10',
          '2xl:h-112.5 2xl:px-16.25',
        )}
      >
        <Image
          src={banerUrl}
          alt=''
          aria-hidden
          priority
          fill
          className='absolute -z-1 object-cover max-lg:hidden'
        />

        <div
          className={cn(
            'flex w-full flex-col items-center gap-y-2.5 rounded-[1.25rem]',
            'lg:w-fit',
            'lg:bg-dark-0e/70 lg:flex-row lg:gap-0',
            'xl:gap-x-5',
          )}
        >
          <div className='flex w-full flex-col items-center lg:hidden'>
            <div className='relative h-40 w-full overflow-hidden rounded-t-[1.25rem] sm:h-60 md:h-70'>
              <Image
                src={banerUrl}
                alt=''
                aria-hidden
                priority
                fill
                className='object-cover'
              />
            </div>

            <div className='relative z-10 -mt-20 sm:-mt-25 md:-mt-30'>
              <ProfileAvatar
                authorName={name}
                avatarUrl={avatarUrl}
                width={250}
                height={250}
                className={cn(
                  'border-dark-0e bg-dark-0e rounded-full border-3 object-contain',
                  'size-30 sm:size-40 md:size-50',
                )}
              />
            </div>
          </div>

          <ProfileAvatar
            authorName={name}
            avatarUrl={avatarUrl}
            width={250}
            height={250}
            className='hidden lg:block lg:size-62.5 lg:object-contain lg:pl-6.25'
          />

          <div
            className={cn(
              'flex flex-col gap-y-3.75 px-5',
              'max-lg:items-center',
              'lg:pt-2.5 lg:pb-5',
              'md:gap-y-7.5',
            )}
          >
            <ProfileHeroHeader
              createdAt={createdAt}
              name={name}
              role={role}
              userTag={userTag}
            />

            <p
              className={cn(
                'font-bold',
                'max-sm:text-sm',
                'md:max-w-115',
                'max-lg:text-gray-9e max-lg:text-center',
                'xl:max-w-125',
              )}
            >
              {description}
            </p>

            <div
              className={cn(
                'flex flex-col gap-y-2 *:w-full',
                'max-lg:justify-center',
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
