// Функция для безопасного получения сообщения об ошибке
import type { UserCreateError } from '../../api/generated';

export const getErrorMessage = (error: UserCreateError): string => {
  if (typeof error === 'string') {
    return error;
  }

  if (error && typeof error === 'object') {
    return (error as any).detail || 'Ошибка валидации';
  }

  return 'Неизвестная ошибка';
};

export const getAuthErrorMessage = (error: UserCreateError): string => {
  if (typeof error === 'string') {
    return error;
  }

  if (error && 'message' in error) {
    return error.message;
  }

  return 'Произошла непредвиденная ошибка';
};
