import favoritesIcon from '@/assets/icons/sidebar-nav/gray-star.svg';
import LinkIcon from '@/assets/icons/sidebar-nav/link-icon.svg';

import { AccCatergory } from '../acc-category.interface';

export const accCategories: AccCatergory[] = [
  {
    title: 'Рекомендации',
    icon: favoritesIcon,
    subparagraphs: [
      {
        title: 'Правила форума',
        href: '/rules',
      },
      {
        title: 'Правила сообществ',
        href: '/rules/community',
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
