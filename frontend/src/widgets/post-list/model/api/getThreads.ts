import { ThreadsResponse } from '../types/thread.types';

const TOKEN =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjQzLCJpc3MiOiJmb3J1bSIsImV4cCI6MTc3NDc4MzU0MiwianRpIjoiQVowNVBENjNjWHU1eHNkKzBZcW9jQSJ9.uGWRGSnAfVZasfbkmRzThMjA9IJ6Xx6Rpa2Av9OAS5E';

export async function getThreads(
  page: number,
  limit: number,
): Promise<ThreadsResponse> {
  const res = await fetch(
    `https://comunicore.mooo.com/api/threads?limit=${limit}&page=${page}`,
    {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    },
  );

  if (!res.ok) {
    throw new Error('Ошибка сети');
  }

  return res.json();
}
