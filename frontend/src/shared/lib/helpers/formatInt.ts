export const formatInt = (views: number): string => {
  if (views >= 1000000) {
    return (views / 1000000).toFixed(1) + 'м';
  }
  if (views >= 1000) {
    return (views / 1000).toFixed(1) + 'к';
  }
  return views.toString();
};
