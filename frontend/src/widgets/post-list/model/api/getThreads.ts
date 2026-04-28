import { ThreadsResponse } from '../types/thread.types';

type RawThread = Record<string, unknown>;

const toNumber = (value: unknown, fallback = 0) =>
  typeof value === 'number' ? value : Number(value) || fallback;

const toString = (value: unknown, fallback = '') =>
  typeof value === 'string' ? value : fallback;

const normalizeThread = (thread: RawThread) => ({
  ...thread,
  id: toNumber(thread.id),
  author_id: toNumber(thread.author_id ?? thread.authorId),
  author_name: toString(thread.author_name ?? thread.authorName),
  created_at: toString(thread.created_at ?? thread.createdAt),
  title: toString(thread.title),
  content: toString(thread.content),
  posts_count: toNumber(thread.posts_count ?? thread.postsCount),
  isLiked: Boolean(thread.isLiked),
  stats:
    typeof thread.stats === 'object' && thread.stats !== null
      ? {
          likes: toNumber((thread.stats as RawThread).likes),
          views: toNumber((thread.stats as RawThread).views),
          comments: toNumber((thread.stats as RawThread).comments),
        }
      : { likes: 0, views: 0, comments: 0 },
});

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
  const rawThreads = Array.isArray(data?.threads) ? data.threads : [];

  return {
    threads: rawThreads.map((thread: RawThread) => normalizeThread(thread)),
    have_next: data?.have_next ?? false,
  };
}
