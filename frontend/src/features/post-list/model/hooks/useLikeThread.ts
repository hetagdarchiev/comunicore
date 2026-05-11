import {
  InfiniteData,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';

import { Thread, ThreadsResponse } from '../types/thread.types';

export function useLikeThread() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (_threadId: number) => {
      // Здесь будет запрос к API когда будет готов бэк
      // const res = await fetch(`https://mooo.com{threadId}/like`, {
      //   method: 'POST',
      //   credentials: 'include', // чтобы передались куки/авторизация
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      // });
      // if (!res.ok) {
      //   throw new Error('Не удалось поставить лайк');
      // }
      // return res.json();
    },

    onMutate: async (threadId: number) => {
      await queryClient.cancelQueries({ queryKey: ['threads'] });

      const previousData = queryClient.getQueryData<
        InfiniteData<ThreadsResponse>
      >(['threads']);

      queryClient.setQueryData<InfiniteData<ThreadsResponse>>(
        ['threads'],
        (old) => {
          if (!old) return old;

          return {
            ...old,
            pages: old.pages.map((page) => ({
              ...page,
              threads: page.threads.map((thread: Thread) => {
                if (thread.id === threadId) {
                  const newIsLiked = !thread.isLiked;
                  return {
                    ...thread,
                    isLiked: newIsLiked,
                    stats: {
                      ...thread.stats,
                      likes: newIsLiked
                        ? (thread.stats?.likes ?? 0) + 1
                        : Math.max(0, (thread.stats?.likes ?? 0) - 1),
                    },
                  };
                }
                return thread;
              }),
            })),
          };
        },
      );

      return { previousData };
    },

    onError: (_err, _threadId, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(['threads'], context.previousData);
      }
    },

    onSettled: () => {
      // queryClient.invalidateQueries({ queryKey: ['threads'] }); //закоментировано пока нет реального запроса в бэк
    },
  });
}
