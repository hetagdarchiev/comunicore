import DOMPurify from 'isomorphic-dompurify';

export const sanitize = (html: string) =>
  DOMPurify.sanitize(html, {
    USE_PROFILES: { html: true },
  });
