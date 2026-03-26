import { client } from './generated/client.gen';
import { authRefresh } from './generated/sdk.gen';
import type { JwtToken } from './generated/types.gen';

client.setConfig({
  baseUrl: 'https://comunicore.mooo.com',
  credentials: 'include',
});

let refreshPromise: Promise<string | null> | null = null;

const isAuthRequest = (url: string) =>
  url.includes('/api/auth/login') ||
  url.includes('/api/auth/refresh') ||
  url.includes('/api/auth/logout');

const refreshAccessToken = async (): Promise<string | null> => {
  if (refreshPromise) {
    return refreshPromise;
  }

  refreshPromise = (async () => {
    try {
      const { data } = await authRefresh({ throwOnError: true });
      const tokenData = data as JwtToken;

      if (!tokenData?.accessToken) {
        localStorage.removeItem('accessToken');
        return null;
      }

      localStorage.setItem('accessToken', tokenData.accessToken);
      return tokenData.accessToken;
    } catch {
      localStorage.removeItem('accessToken');
      return null;
    } finally {
      refreshPromise = null;
    }
  })();

  return refreshPromise;
};

client.interceptors.request.use((request) => {
  const token =
    typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;

  if (token && !request.url.includes('/api/auth')) {
    request.headers.set('Authorization', `Bearer ${token}`);
  }
  return request;
});

client.interceptors.response.use(async (response, request, options) => {
  if (response.status !== 401 || isAuthRequest(request.url)) {
    return response;
  }

  if (request.headers.get('x-auth-retry') === '1') {
    return response;
  }

  const newAccessToken = await refreshAccessToken();
  if (!newAccessToken) {
    return response;
  }

  const headers = new Headers(options.headers);
  headers.set('Authorization', `Bearer ${newAccessToken}`);
  headers.set('x-auth-retry', '1');

  const retriedResult = await client.request({
    ...options,
    headers,
  });

  if (
    retriedResult &&
    typeof retriedResult === 'object' &&
    'response' in retriedResult &&
    retriedResult.response
  ) {
    return retriedResult.response as Response;
  }

  return response;
});
