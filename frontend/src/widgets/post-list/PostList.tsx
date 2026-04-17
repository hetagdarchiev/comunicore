'use client';

import { useInfiniteScroll } from './model/hooks/useInfiniteScroll';
import { useLikeThread } from './model/hooks/useLikeThread';
import { useThreads } from './model/hooks/useThreads';
import { PostListLoader } from './ui/PostListLoader';
import { PostListView } from './ui/PostListView';
// import { Sorting } from './ui/sorting';

export function PostList() {
  const postCount = 4;

  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useThreads(postCount);

  const { mutate: handleLike } = useLikeThread();

  const lastElementRef = useInfiniteScroll(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  });

  if (isLoading) return <PostListLoader />;
  if (error) return <div>Ошибка: {(error as Error).message}</div>;

  const threads =
    data?.pages
      .flatMap((page) => page?.threads ?? [])
      .filter(
        (thread, index, self) =>
          index === self.findIndex((t) => t.id === thread.id),
      ) || [];

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
