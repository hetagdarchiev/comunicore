'use client';

import { useCallback, useRef } from 'react';

export function useInfiniteScroll(callback: () => void) {
  const observer = useRef<IntersectionObserver | null>(null);

  return useCallback(
    (node: HTMLDivElement | null) => {
      if (!node) return;

      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            callback();
          }
        },
        {
          rootMargin: '300px',
          threshold: 0,
        },
      );

      observer.current.observe(node);
    },
    [callback],
  );
}
