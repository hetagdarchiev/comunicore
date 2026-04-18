import favoritesIcon from '@/assets/icons/sidebar-nav/gray-star.svg';
import LinkIcon from '@/assets/icons/sidebar-nav/link-icon.svg';

import { AccCatergory } from '../types/acc-category.interface';
import { AppRouter } from '@/shared/config/app-router';

export const accCategories: AccCatergory[] = [
  {
    title: 'Рекомендации',
    icon: favoritesIcon,
    subparagraphs: [
      {
        title: 'Правила форума',
        href: AppRouter.rules,
      },
      {
        title: 'Правила сообществ',
        href: AppRouter.community,
      },
    ],
  },
  {
    title: 'Ссылки',
    icon: LinkIcon,
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
];
