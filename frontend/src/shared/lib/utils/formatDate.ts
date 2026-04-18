const formatter = new Intl.DateTimeFormat('ru-RU', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
});

export const formatDate = (dateString: Date) => {
  const date = new Date(dateString);
  return formatter.format(date);
};
