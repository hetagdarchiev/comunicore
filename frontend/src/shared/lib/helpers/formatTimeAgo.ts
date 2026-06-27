import {
  differenceInDays,
  differenceInMinutes,
  format,
  formatDistance,
  formatDistanceToNow,
  isToday,
  isYesterday,
  startOfDay,
} from 'date-fns';
import { ru } from 'date-fns/locale';

interface FormatTimeAgoOptions {
  short: boolean;
}

const shortTimeOutput = (date: Date, now: Date) => {
  const minutesAgo = differenceInMinutes(now, date);
  if (minutesAgo < 60) {
    return 'недавно';
  } else if (isToday(date)) {
    return 'сегодня';
  } else if (isYesterday(date)) {
    return 'вчера';
  }

  const daysAgo = differenceInDays(now, date);
  if (daysAgo > 30) return format(date, 'dd.MM.yyyy');

  return formatDistance(startOfDay(date), startOfDay(now), {
    addSuffix: true,
    locale: ru,
  });
};

export const formatTimeAgo = (
  dateInput: string,
  options?: FormatTimeAgoOptions,
): string => {
  const date = new Date(dateInput);
  const now = new Date();

  if (options?.short) return shortTimeOutput(date, now);

  return formatDistanceToNow(date, {
    addSuffix: true,
    locale: ru,
  });
};
