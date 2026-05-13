import { client } from './generated/client.gen';

export const apiBaseUrl = (
  process.env.NEXT_PUBLIC_API_BASE_URL ?? 'https://comunicore.mooo.com'
).replace(/\/+$/, '');

client.setConfig({
  baseUrl: apiBaseUrl,
  credentials: 'include',
});

client.interceptors.response.use((response) => {
  if (response.status === 401) {
    console.warn('Сессия истекла или отсутствует');
  }
  return response;
});
