import { apiBaseUrl } from '@/shared/api/setup';

import { ThreadsResponse } from '../types/thread.types';

export async function getThreads(
  page: number,
  limit: number,
): Promise<ThreadsResponse> {
  const res = await fetch(
    `${apiBaseUrl}/api/threads?limit=${limit}&page=${page}`,
    {
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );

  if (!res.ok) {
    throw new Error(`Ошибка сети: ${res.status}`);
  }

  const data = await res.json();

  return {
    threads: data?.threads ?? [],
    haveNext: data?.haveNext ?? false,
  };
}
