'use client';

import { BsArrowRight } from 'react-icons/bs';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { mockTags } from '../model/data/mock-tags';

import { cn } from '@/shared/lib/classNames';
import { Tag } from '@/shared/ui';

const TAG_QUERY_KEY = 'tags';

export function FilterByTag() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentParams = new URLSearchParams(searchParams.toString());

  const findTagsInUrl = (): string[] => {
    const tagsToken = currentParams.get(TAG_QUERY_KEY);
    return tagsToken ? tagsToken.split(',') : [];
  };

  const addTagToQueryUrl = (name: string) => {
    let activeTags = findTagsInUrl();

    if (activeTags.includes(name)) {
      activeTags = activeTags.filter((tag) => tag !== name);
    } else {
      activeTags.push(name);
    }

    if (activeTags.length > 0) {
      currentParams.set(TAG_QUERY_KEY, activeTags.join(','));
    } else {
      currentParams.delete(TAG_QUERY_KEY);
    }
    router.push(`${pathname}?${currentParams.toString()}`, { scroll: false });
  };

  return (
    <div className='bg-dark-1b/50 border-gray-9e/10 space-y-6.75 rounded-[1.25rem] border px-3.75 py-5'>
      <h2 className='text-lg font-bold'>Популярные теги</h2>
      <ul className='grid grid-cols-1 gap-y-2.75'>
        {mockTags.map(({ name, quantity }, index) => {
          const activeTag = findTagsInUrl().includes(name);
          return (
            <li key={name + index} className='text-gray-9e'>
              <button
                type='button'
                className={cn(
                  'flex w-full items-center justify-between rounded-lg py-2 duration-200',
                  'hover:bg-purple-67/10 hover:px-2',
                  'hover:*:border-purple-67 hover:*:text-purple-67',
                  activeTag &&
                    'bg-purple-67/10 *:border-purple-67 *:text-purple-67 px-2',
                )}
                onClick={() => addTagToQueryUrl(name)}
              >
                <Tag color='dark'>{name}</Tag>
                <span>{quantity}</span>
              </button>
            </li>
          );
        })}
      </ul>
      <button
        type='button'
        className='text-purple-67 flex items-center gap-x-2.5 px-5 text-lg font-bold'
        onClick={() => console.log('Here must be logic which show all tags')}
      >
        <span>Смотреть все теги</span>
        <BsArrowRight size={24} />
      </button>
    </div>
  );
}
