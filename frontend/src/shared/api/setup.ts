import { client } from './generated/client.gen';

client.setConfig({
  baseUrl: 'https://comunicore.mooo.com',
  credentials: 'include',
});

client.interceptors.response.use((response) => {
  if (response.status === 401) {
    console.warn('Сессия истекла или отсутствует');
  }
  return response;
});
