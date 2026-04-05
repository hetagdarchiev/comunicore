import type { UserCreateError } from '../../api/generated';

// Функция для безопасного получения сообщения об ошибке
export const getErrorMessage = (error: UserCreateError): string => {
  if (error && typeof error === 'string') {
    return error;
  }

  if (error && typeof error === 'object' && error.code) {
    return error.code;
  }

  return 'Неизвестная ошибка от сервера';
};
