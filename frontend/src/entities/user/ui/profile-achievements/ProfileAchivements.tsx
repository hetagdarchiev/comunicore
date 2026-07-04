import Image from 'next/image';

import { UserAchievement } from '../../model/types/user.types';

import { isApiUrl } from '@/shared/guards/isApiUrl.guard';
import { cn } from '@/shared/lib/classNames';
import { Tile } from '@/shared/ui';

export function ProfileAchivements(props: { achievements: UserAchievement[] }) {
  const { achievements } = props;
  const validAchievements = achievements.filter((achiv) =>
    isApiUrl(achiv.imageUrl),
  );

  if (validAchievements.length === 0) return null;

  return (
    <Tile className='flex flex-col gap-y-7.5'>
      <h3 className='text-lg font-bold'>Достижения</h3>
      <ul className={cn('flex flex-wrap gap-x-7.5 gap-y-4')}>
        {validAchievements.map(({ imageUrl, name, id }) => (
          <li key={id} className='relative size-25'>
            <Image
              src={imageUrl}
              alt={name}
              sizes='100'
              fill
              priority={false}
            />
          </li>
        ))}
      </ul>
    </Tile>
  );
}
