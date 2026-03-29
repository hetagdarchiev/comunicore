import { Thread } from '../model/types/thread.types';import { PostCard } from '@/entities/post';

type Props = {
  threads: Thread[];
  onLike: (id: number) => void;
  lastRef: (node: HTMLDivElement | null) => void;
  isFetchingNextPage: boolean;
};

export function PostListView({
  threads,
  onLike,
  lastRef,
  isFetchingNextPage,
}: Props) {
  return (
    <div className='custom-scrollbar flex h-screen w-full flex-col gap-4 overflow-y-auto py-4 pr-2 pb-32'>
      {threads.map((thread, index) => {
        const isLast = threads.length === index + 1;

        const card = (
          <PostCard
            key={thread.id}
            {...thread}
            onLike={() => onLike(thread.id)}
          >
            {thread.content}
          </PostCard>
        );

        return isLast ? (
          <div ref={lastRef} key={thread.id}>
            {card}
          </div>
        ) : (
          card
        );
      })}

      <div className='h-6 text-center'>
        {isFetchingNextPage && 'Загрузка ещё...'}
      </div>
    </div>
  );
}
