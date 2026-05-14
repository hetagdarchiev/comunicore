import { RefObject } from 'react';
import { LuLoaderCircle } from 'react-icons/lu';

import { PostCard } from '@/entities/post';

import { ThreadListItem } from '@/shared/api/generated';

type Props = {
  threads: ThreadListItem[];
  wrapperRef: RefObject<HTMLUListElement | null>;
  trigerRef: RefObject<HTMLLIElement | null>;
  isFetchingNextPage: boolean;
};

export function PostListView({
  threads,
  trigerRef,
  wrapperRef,
  isFetchingNextPage,
}: Props) {
  return (
    <ul
      ref={wrapperRef}
      className='no-scrollbar relative flex h-screen w-full flex-col gap-4 overflow-y-auto pb-50'
    >
      {threads.map((thread) => (
        <li key={thread.id}>
          <PostCard {...thread} />
        </li>
      ))}
      <li
        ref={trigerRef}
        className='flex h-10 w-full justify-center text-center'
      >
        {isFetchingNextPage && (
          <LuLoaderCircle
            size={24}
            aria-label='Loading'
            role='alert'
            className='animate-spin text-blue-600'
          />
        )}
      </li>
    </ul>
  );
}
