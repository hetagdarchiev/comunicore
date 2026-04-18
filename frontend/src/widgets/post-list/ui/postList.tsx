'use client';

import { useInfiniteScroll } from '../model/hooks/useInfiniteScroll';
import { useLikeThread } from '../model/hooks/useLikeThread';
import { useThreads } from '../model/hooks/useThreads';

import { PostListLoader } from './post-list-loader/postListLoader';
import { PostListView } from './post-list-view/postListView';
// import { Sorting } from './ui/sorting';

const POST_COUNT = 4;

export function PostList() {
  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useThreads(POST_COUNT);

  const { mutate: handleLike } = useLikeThread();

  const lastElementRef = useInfiniteScroll(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  });

  const threads =
    data?.pages
      .flatMap((page) => page?.threads ?? [])
      .filter(
        (thread, index, self) =>
          index === self.findIndex((t) => t.id === thread.id),
      ) || [];

  if (isLoading) return <PostListLoader />;
  if (error) return <div>Ошибка: {error.message}</div>;
  if (!threads.length) {
    return <div className='mt-10 text-center'>Постов пока нет</div>;
  }

  return (
    <div>
      {/* <Sorting /> */}
      <PostListView
        threads={threads}
        onLike={handleLike}
        lastRef={lastElementRef}
        isFetchingNextPage={isFetchingNextPage}
      />
    </div>
  );
}
