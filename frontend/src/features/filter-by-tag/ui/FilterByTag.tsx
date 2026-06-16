'use client';

import { useMemo } from 'react';
import { BsArrowRight } from 'react-icons/bs';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { mockTags } from '../model/data/mock-tags';

import { cn } from '@/shared/lib/classNames';
import { Button, Tag } from '@/shared/ui';

const TAG_QUERY_KEY = 'tags';

export function FilterByTag() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const activeTags = useMemo(() => {
    const tagsToken = searchParams.get(TAG_QUERY_KEY);
    return tagsToken ? tagsToken.split(',') : [];
  }, [searchParams]);

  const addTagToQueryUrl = (name: string) => {
    const currentParams = new URLSearchParams(searchParams.toString());
    let updatedTags = [...activeTags];

    if (updatedTags.includes(name)) {
      updatedTags = updatedTags.filter((tag) => tag !== name);
    } else {
      updatedTags.push(name);
    }
    if (updatedTags.length > 0) {
      currentParams.set(TAG_QUERY_KEY, updatedTags.join(','));
    } else {
      currentParams.delete(TAG_QUERY_KEY);
    }
    router.push(`${pathname}?${currentParams.toString()}`, { scroll: false });
  };

  return (
    <div
      className={cn(
        'bg-dark-1b/50 border-gray-9e/10 contents rounded-[1.25rem] border px-3.75 py-5',
        'xl:grid xl:gap-y-6.75',
      )}
    >
      <div
        className={cn(
          'order-1 flex flex-col gap-y-2',
          'sm:flex-row sm:justify-between sm:gap-x-5 sm:gap-y-0',
          'xl:contents',
        )}
      >
        <h2 className='text-lg font-bold'>Популярные теги</h2>
        <Button size='sm' className='inline-flex w-full sm:w-fit xl:hidden'>
          Смотреть все теги
        </Button>
      </div>
      <ul
        className={cn(
          'custom-scrollbar flex items-center gap-x-5 overflow-auto',
          'xl:grid xl:grid-cols-1 xl:gap-x-0 xl:gap-y-2.75',
        )}
      >
        {mockTags.map(({ name, quantity }, index) => {
          const activeTag = activeTags.includes(name);
          return (
            <li key={name + index} className='text-gray-9e'>
              <button
                type='button'
                className={cn(
                  'relative flex w-full items-center justify-between gap-x-2 rounded-lg py-2 duration-200',
                  'xl:hover:bg-purple-67/10 xl:hover:px-2',
                  'xl:hover:*:border-purple-67 xl:hover:*:text-purple-67',
                  activeTag && '*:text-purple-86 *:duration-100',
                  activeTag &&
                    'xl:bg-purple-67/10 xl:*:border-purple-67 xl:px-2',
                  'xl:static',
                )}
                onClick={() => addTagToQueryUrl(name)}
              >
                <Tag
                  color='dark'
                  className={cn(
                    'px-4 py-3 text-lg',
                    'xl:h-7.5 xl:px-1.5 xl:text-sm',
                  )}
                >
                  {name}
                </Tag>
                <span
                  className={cn(
                    'border-l-gray-9e/30 border-l pl-2',
                    'xl:border-0 xl:pl-0',
                  )}
                >
                  {quantity}
                </span>
              </button>
            </li>
          );
        })}
      </ul>

      <button
        type='button'
        className={cn(
          'hidden',
          'xl:text-purple-67 xl:flex xl:items-center xl:gap-x-2.5 xl:px-5 xl:text-lg xl:font-bold xl:whitespace-nowrap',
        )}
        onClick={() => console.log('Here must be logic which show all tags')}
      >
        <span>Смотреть все теги</span>
        <BsArrowRight size={24} className='min-w-6' />
      </button>
    </div>
  );
}
