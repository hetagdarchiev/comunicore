const BASE_API_URL =
  process.env.NEXT_PUBLIC_API_URL || 'https://comunicore.mooo.com/api';

// If you need to allow other URLs (e.g., from GitHub or LinkedIn), simply add them to this array.
const VALID_URLS = [BASE_API_URL, '/'];

export const isApiUrl = (url: unknown): url is string => {
  if (typeof url !== 'string') return false;

  return (
    typeof url === 'string' &&
    VALID_URLS.some((validUrl) => url.startsWith(validUrl))
  );
};
