import { client } from './generated/client.gen';

client.setConfig({
  baseUrl: 'https://comunicore.mooo.com',
  credentials: 'include',
});

client.interceptors.request.use((request) => {
  const token =
    typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;

  if (token && !request.url.includes('/api/auth')) {
    request.headers.set('Authorization', `Bearer ${token}`);
  }
  return request;
});
