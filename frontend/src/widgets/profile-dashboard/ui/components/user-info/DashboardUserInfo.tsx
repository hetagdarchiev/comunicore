import { format } from 'date-fns';

import { User } from '@/entities/user';

import { cn } from '@/shared/lib/classNames';
import { Tile } from '@/shared/ui';

type DashboardUserInfoProps = Pick<
  User,
  'role' | 'createdAt' | 'lastActivity' | 'webSite' | 'location'
>;

export function DashboardUserInfo(props: DashboardUserInfoProps) {
  const { createdAt, lastActivity, role, location, webSite } = props;
  const locationExist = !!(location?.city && location.country);
  return (
    <Tile
      className={cn(
        'flex flex-col gap-y-7.5',
        // children styles
        '**:[h4]:text-gray-9e',
        '**:[p,a,time]:font-bold',
        '*:[div]:flex *:[div]:flex-col *:[div]:gap-y-2.5',
      )}
    >
      <h3 className='text-lg font-bold'>Инфо</h3>

      <div>
        <h4>Роль</h4>
        <p>{role}</p>
      </div>

      <div>
        <h4>На форуме с </h4>
        <time dateTime={createdAt}>{format(createdAt, 'dd.MM.yyyy')}</time>
      </div>

      <div>
        <h4>Последняя активность</h4>
        <time dateTime={lastActivity}>
          {format(lastActivity, 'dd.MM.yyyy')}
        </time>
      </div>

      {webSite && (
        <div>
          <h4>Веб сайт</h4>
          <a
            href={webSite}
            target='_blank'
            rel='noreferrer noopener'
            className='hover:underline'
          >
            {webSite}
          </a>
        </div>
      )}

      {locationExist && (
        <div>
          <h4>Локация</h4>
          <p className='capitalize'>{`${location.city}, ${location.country}`}</p>
        </div>
      )}
    </Tile>
  );
}
