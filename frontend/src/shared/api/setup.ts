import { client } from './generated/client.gen';

client.setConfig({
  baseUrl: 'https://comunicore.mooo.com',
  credentials: 'include',
});

// client.interceptors.request.use((request) => {
//   const token =
//     typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;
//
//   if (token && !request.url.includes('/api/auth')) {
//     request.headers.set('Authorization', `Bearer ${token}`);
//   }
//   return request;
// });

console.log('🚀 [API Setup] Скрипт конфигурации запущен');

client.interceptors.request.use((request) => {
  const token =
    typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;

  if (token && !request.url.includes('/api/auth')) {
    // Очищаем токен от возможных кавычек, если они там есть
    const cleanToken = token.replace(/^"|"$/g, '');

    const authValue = `Bearer ${cleanToken}`;
    request.headers.set('Authorization', authValue);

    // ВАЖНО: смотрим, что в итоге улетает
    console.log(
      `📡 [Interceptor] Добавлен заголовок для ${request.url}:`,
      authValue,
    );
  } else {
    console.log(
      `📡 [Interceptor] Токен не добавлен для ${request.url} (либо нет токена, либо это путь auth)`,
    );
  }
  return request;
});
