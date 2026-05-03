import { md } from './parser';
import { sanitize } from './sanitize';

export function renderHtml(markdown: string) {
  const html = md.render(markdown);

  return sanitize(html);
}
