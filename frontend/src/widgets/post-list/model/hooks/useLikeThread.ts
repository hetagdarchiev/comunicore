'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { ThreadsResponse } from '../types/thread.types';

export function useLikeThread() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (threadId: number) => {
      console.log(`Лайк для треда: ${threadId}`);
    },

    onMutate: async (threadId) => {
      await queryClient.cancelQueries({ queryKey: ['threads'] });

      const previousData = queryClient.getQueryData(['threads']);

      queryClient.setQueryData(['threads'], (old: any) => {
        if (!old) return old;

        return {
          ...old,
          pages: old.pages.map((page: ThreadsResponse) => ({
            ...page,
            threads: page.threads.map((thread) =>
              thread.id === threadId
                ? {
                    ...thread,
                    // сюда добавить лайки потом
                  }
                : thread,
            ),
          })),
        };
      });

      return { previousData };
    },
  });
}
