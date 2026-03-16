'use client';

import { useMemo } from 'react';
import DOMpurify from 'dompurify';
import MarkdownIt from 'markdown-it';

const md: MarkdownIt = new MarkdownIt({
  html: false,
  linkify: true,
  typographer: true,
});

// Links security

md.renderer.rules.link_open = (tokens, idx, options, _, self) => {
  const aIndex = tokens[idx].attrIndex('target');
  const token = tokens[idx];

  const hrefIndex = token.attrIndex('href');
  const href = hrefIndex >= 0 ? token.attrs![hrefIndex][1] : '';

  if (aIndex < 0) {
    tokens[idx].attrPush(['target', '_blank']);
  } else {
    tokens[idx].attrs![aIndex][1] = '_blank';
  }
  tokens[idx].attrPush(['rel', 'noopener noreferrer']);

  token.attrPush(['data-confirm-link', href]);

  return self.renderToken!(tokens, idx, options);
};

// Component Preview

export function Preview({ markdown }: { markdown: string }) {
  const html = useMemo(
    () =>
      DOMpurify.sanitize(md.render(markdown), { USE_PROFILES: { html: true } }),
    [markdown],
  );

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;

    if (target.tagName === 'A') {
      const url = target.getAttribute('href');

      const confirmLeave = window.confirm(
        `Вы переходите на внешний сайт:\n${url}\nПродолжить?`,
      );

      if (!confirmLeave) {
        e.preventDefault();
      }
    }
  };

  return (
    <div
      onClick={handleClick}
      className='rounded-lg border border-neutral-600 bg-white p-2 duration-200'
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
