'use client';

import { useThreads } from '../model/hooks/useThreads';

import { PostListView } from './components/post-list-view/PostListView';
import { Sorting } from './components/sorting/Sorting';

import { Loader } from '@/shared/ui';

export function PostList() {
  const {
    threads,
    triggerRef,
    wrapperRef,
    isLoading,
    error,
    isFetchingNextPage,
  } = useThreads();

  const errorWithCode = typeof error !== 'string';

  if (isLoading) return <Loader className='absolute top-[50%] left-[50%]' />;
  if (error)
    return (
      <div className='flex h-full w-full items-center justify-center font-bold'>
        Ошибка: {errorWithCode ? error.message : error}
      </div>
    );
  if (!threads.length) {
    return <div className='mt-10 text-center'>Постов пока нет</div>;
  }

  return (
    <div className='overflow-y-hidden'>
      <Sorting />
      <PostListView
        threads={threads}
        trigerRef={triggerRef}
        wrapperRef={wrapperRef}
        isFetchingNextPage={isFetchingNextPage}
      />
    </div>
  );
}
