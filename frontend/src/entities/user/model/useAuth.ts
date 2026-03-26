import {
  userMeOptions,
  userMeQueryKey,
} from '@/shared/api/generated/@tanstack/react-query.gen';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

export function useAuth() {
  const [mounted, setMounted] = useState(false);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const queryClient = useQueryClient();

  useEffect(() => {
    setMounted(true);
    setAccessToken(localStorage.getItem('accessToken'));

    const onAccessTokenUpdated = () => {
      const next = localStorage.getItem('accessToken');
      setAccessToken(next);
      // Даже если токен строково не изменился, принудительно обновим `user/me`.
      queryClient.invalidateQueries({ queryKey: userMeQueryKey() });
    };

    window.addEventListener('accessTokenUpdated', onAccessTokenUpdated);
    return () => {
      window.removeEventListener('accessTokenUpdated', onAccessTokenUpdated);
    };
  }, []);

  const hasToken = mounted && !!accessToken;

  const {
    data: user,
    isLoading,
    isError,
  } = useQuery({
    ...userMeOptions(),
    enabled: hasToken,
    retry: false,
    staleTime: 5 * 60 * 1000,
  });

  return {
    user,
    isAuthenticated: hasToken && !!user && !isError,
    // While hydrating on the client (before `useEffect`), avoid flashing auth buttons.
    // If there's no token, we'll quickly switch to Buttons after mount.
    isLoading: !mounted || (hasToken && isLoading),
  };
}
