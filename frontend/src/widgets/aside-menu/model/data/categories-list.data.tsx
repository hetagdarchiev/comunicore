import { AppRouter } from '@/shared/config/app-router';
import { Category } from '../types/categories.interface';

export const categories: Category[] = [
  {
    title: 'Вопросы',
    icon: (
      <svg
        width='20'
        height='20'
        viewBox='0 0 20 20'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          d='M6.66663 5H17.5'
          stroke='#F48023'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          d='M6.66663 10H17.5'
          stroke='#F48023'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          d='M6.66663 15H17.5'
          stroke='#F48023'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          d='M2.5 5H2.50833'
          stroke='#F48023'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          d='M2.5 10H2.50833'
          stroke='#F48023'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          d='M3 15H3.00833'
          stroke='#F48023'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
      </svg>
    ),
    href: AppRouter.questions,
  },
  {
    title: 'Теги',
    icon: (
      <svg
        width='20'
        height='20'
        viewBox='0 0 20 20'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <g clipPath='url(#clip0_1_125)'>
          <path
            d='M17.4917 10.0083L11.5167 15.9833C11.3619 16.1383 11.1781 16.2612 10.9757 16.3451C10.7734 16.429 10.5565 16.4721 10.3375 16.4721C10.1185 16.4721 9.9016 16.429 9.69927 16.3451C9.49694 16.2612 9.31312 16.1383 9.15833 15.9833L2 8.83333V0.5H10.3333L17.4917 7.65833C17.8021 7.9706 17.9763 8.39302 17.9763 8.83333C17.9763 9.27364 17.8021 9.69606 17.4917 10.0083V10.0083Z'
            stroke='#808080'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <path
            d='M5.83337 5.83333H5.8424'
            stroke='#808080'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </g>
        <defs>
          <clipPath id='clip0_1_125'>
            <rect width='20' height='20' fill='white' />
          </clipPath>
        </defs>
      </svg>
    ),
    href: AppRouter.tags,
  },
  {
    title: 'Ранг',
    icon: (
      <svg
        width='20'
        height='20'
        viewBox='0 0 20 20'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <g clipPath='url(#clip0_1_130)'>
          <path
            d='M9.99996 12.5C13.2216 12.5 15.8333 9.88834 15.8333 6.66668C15.8333 3.44502 13.2216 0.833344 9.99996 0.833344C6.7783 0.833344 4.16663 3.44502 4.16663 6.66668C4.16663 9.88834 6.7783 12.5 9.99996 12.5Z'
            stroke='#808080'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <path
            d='M6.84171 11.575L5.83337 19.1667L10 16.6667L14.1667 19.1667L13.1584 11.5667'
            stroke='#808080'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </g>
        <defs>
          <clipPath id='clip0_1_130'>
            <rect width='20' height='20' fill='white' />
          </clipPath>
        </defs>
      </svg>
    ),
    href: AppRouter.award,
  },
];
