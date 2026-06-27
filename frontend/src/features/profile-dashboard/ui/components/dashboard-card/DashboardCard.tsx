import Link from 'next/link';

import { DashboardItemTypes } from '../../../model/types/dashboard-item.types';

import { DashboardItem } from './DashboardItem';

import { Tile } from '@/shared/ui';

interface DashboardCardProps {
  href: string;
  title: string;
  items: DashboardItemTypes[];
}
export function DashboardCard(props: DashboardCardProps) {
  const { href, title, items } = props;
  return (
    <Tile size='lg' className='flex flex-col gap-y-7.5'>
      <div className='flex justify-between gap-x-10'>
        <h3 className='text-lg font-bold'>{title}</h3>
        <Link href={href} className='text-purple-86 text-lg'>
          Смотреть все
        </Link>
      </div>
      <ul className='flex flex-col gap-y-7.5'>
        {items.map((item) => (
          <DashboardItem key={item.id} {...item} />
        ))}
      </ul>
    </Tile>
  );
}
