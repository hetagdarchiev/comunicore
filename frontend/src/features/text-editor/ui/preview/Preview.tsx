'use client';

import { useMemo } from 'react';

import { renderHtml } from '../../model/lib/markdown';

export function Preview({ markdown }: { markdown: string }) {
  const html = useMemo(() => renderHtml(markdown), [markdown]);

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;

    const link = (e.target as HTMLElement).closest('a');

    if (link) {
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
      className='p-2 duration-200'
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
