import { LuLink, LuStar } from 'react-icons/lu';

import { AppRouter } from '@/shared/config/app-router';

import { AccCatergory } from '../types/acc.interface';

export const accCategories = [
  {
    title: 'Рекомендации',
    Icon: LuStar,
    subparagraphs: [
      {
        title: 'Правила форума',
        href: AppRouter.rules.root,
      },
      {
        title: 'Правила сообществ',
        href: AppRouter.rules.community,
      },
    ],
  },
  {
    title: 'Ссылки',
    Icon: LuLink,
    subparagraphs: [
      {
        title: 'GitHub',
        href: 'https://github.com/',
      },
      {
        title: 'Telegram',
        href: 'https://web.telegram.org/',
      },
      {
        title: 'OnlyFans',
        href: 'https://onlyfans.com/',
      },
    ],
  },
] satisfies AccCatergory[];
