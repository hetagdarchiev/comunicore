import { formatDistanceToNow } from 'date-fns';
import { ru } from 'date-fns/locale';

export const formatTimeAgo = (createdAt: string): string => {
  const dateFromServer = new Date(createdAt);

  return formatDistanceToNow(dateFromServer, {
    addSuffix: true,
    locale: ru,
  });
};
