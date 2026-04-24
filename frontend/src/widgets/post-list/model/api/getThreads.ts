import { ThreadsResponse } from '../types/thread.types';

export async function getThreads(
  page: number,
  limit: number,
): Promise<ThreadsResponse> {
  const res = await fetch(
    `https://comunicore.mooo.com/api/threads?limit=${limit}&page=${page}`,
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
