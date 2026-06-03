import { client } from './generated/client.gen';

export const apiBaseUrl = (
  process.env.NEXT_PUBLIC_API_BASE_URL ?? 'https://comunicore.mooo.com'
).replace(/\/+$/, '');

client.setConfig({
  baseUrl: apiBaseUrl,
  credentials: 'include',
});
