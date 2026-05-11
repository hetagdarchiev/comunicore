import { LuAward, LuList, LuTag } from 'react-icons/lu';

import { AppRouter } from '@/shared/config/app-router';

import { Category } from '../types/categories.interface';

export const categories = [
  {
    title: 'Вопросы',
    Icon: LuList,
    href: AppRouter.questions,
  },
  {
    title: 'Теги',
    Icon: LuTag,
    href: AppRouter.tags.root,
  },
  {
    title: 'Ранг',
    Icon: LuAward,
    href: AppRouter.award,
  },
] satisfies Category[];
