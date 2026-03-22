import { UserCreateError } from '../../api/generated';

export const getErrorMessage = (error: UserCreateError): string => {
  if (typeof error === 'string') {
    return error;
  }
  if (error && typeof error === 'object') {
    return error.code || 'Ошибка валидации';
  }
  return 'Неизвестная ошибка';
};
