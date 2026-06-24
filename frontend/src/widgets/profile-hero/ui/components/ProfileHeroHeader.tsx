import { format } from 'date-fns';

import { User } from '@/entities/user';

import { cn } from '@/shared/lib/classNames';
import { ProfileAvatar, Tag } from '@/shared/ui';

type ProfileHeaderProps = Pick<
  User,
  'avatarUrl' | 'createdAt' | 'name' | 'role' | 'userTag'
>;

export function ProfileHeroHeader(props: ProfileHeaderProps) {
  const { avatarUrl, role, name, createdAt, userTag } = props;
  return (
    <div className='flex flex-col gap-y-2.5'>
      <header
        className={cn(
          'grid grid-cols-[auto_1fr] grid-rows-[auto_1fr] gap-x-5',
          'sm:items-center sm:gap-y-2',
          'md:flex md:flex-col md:items-start md:gap-x-0 md:gap-y-1',
          'lg:flex-row lg:items-center lg:gap-x-3',
        )}
      >
        <ProfileAvatar
          authorName={name}
          avatarUrl={avatarUrl}
          width={75}
          height={75}
          className={cn('row-span-full', 'md:hidden')}
        />
        <h1
          className={cn(
            'text-2xl font-bold',
            'sm:text-4xl',
            'xl:text-5xl xl:leading-16',
            '2xl:text-[4rem] 2xl:leading-19.5',
          )}
        >
          {name}
        </h1>
        <Tag className='text-[0.75rem] whitespace-nowrap md:text-sm'>
          {role}
        </Tag>
      </header>

      <div
        className={cn(
          'flex flex-row flex-wrap justify-between gap-x-5 gap-y-1 font-bold',
          'md:gap-y-0 md:pr-12.5',
        )}
      >
        <span>{userTag}</span>
        <span>
          На форуме с{' '}
          <time dateTime={createdAt}>{format(createdAt, 'dd.MM.yyyy')}</time>
        </span>
      </div>
    </div>
  );
}
