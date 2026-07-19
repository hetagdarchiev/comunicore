'use client';

import { AuthMeResponse } from '../types/authMe.types';

import { useAuthMeQuery } from './useAuthMeQuery';

export const useUser = (options?: { enabled?: boolean }) => {
  const { data, ...query } = useAuthMeQuery(options);

  // TODO: сервер сейчас возвращает плоский UserMeResponse (id, name, email, avatarUrl),
  // а не { accessToken, user }. Каст временный — ждём, пока бэк приведёт
  // ответ /me к контракту AuthMeResponse. Убрать каст и адаптер после этого.
  const user = (data ?? null) as unknown as AuthMeResponse | null;

  return {
    user,
    ...query,
  };
};
