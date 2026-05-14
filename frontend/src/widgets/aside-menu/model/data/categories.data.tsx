import { LuAward, LuInbox, LuList, LuStar, LuTag } from 'react-icons/lu';

import { Category } from '../types/categories.interface';

import { AppRouter } from '@/shared/config/app-router';

export const categories = [
  {
    title: 'Избранное',
    Icon: LuStar,
    href: AppRouter.favorites,
    isDeskHidden: true,
  },
  {
    title: 'Вопросы',
    Icon: LuList,
    href: AppRouter.questions,
    isDeskHidden: true,
  },
  {
    title: 'Почта',
    Icon: LuInbox,
    href: AppRouter.notification,
    isDeskHidden: true,
  },
  {
    title: 'Теги',
    Icon: LuTag,
    href: AppRouter.tags.root,
    isDeskHidden: false,
  },
  {
    title: 'Ранг',
    Icon: LuAward,
    href: AppRouter.award,
    isDeskHidden: false,
  },
] satisfies Category[];
