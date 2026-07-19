'use client';

import { useAuthStore } from '@/entities/session';

import { client } from '@/shared/api/generated/client.gen';

const mePath = 'api/user/me';

let isInitialized = false;
export default function useInterceptor() {
  if (!isInitialized) {
    isInitialized = true;
    console.log('🔥 Интерцептор Hey-API инициализирован');

    client.interceptors.response.use((response) => {
      console.log(
        '🔥 Интерцептор Hey-API поймал ответ:',
        response.url,
        response.status,
      );

      const { logout, setStatus } = useAuthStore.getState().actions;
      const currentStatus = useAuthStore.getState().status;

      if (response.url.includes(mePath) && response.ok) {
        setStatus('authenticated');
        console.log('Пользователь успешно авторизован');
      }

      if (response.status === 401) {
        if (currentStatus !== 'anonymous') {
          logout();
          console.log('401 Ошибка: Пользователь разлогинен');
        }
      }

      return response;
    });
  }
}
