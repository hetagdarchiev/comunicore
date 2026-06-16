'use client';

import { useMemo } from 'react';
import { LuChevronLeft, LuChevronRight } from 'react-icons/lu';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { Button } from './Button';

export const getPaginationRange = (currentPage: number, totalPages: number) => {
  if (totalPages <= 5) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const range: (number | string)[] = [];

  if (currentPage < 3) {
    range.push(1, 2, 3, '...', totalPages);
  } else if (currentPage >= totalPages - 1) {
    range.push(totalPages - 2, totalPages - 1, totalPages);
  } else {
    range.push(
      currentPage - 1,
      currentPage,
      currentPage + 1,
      '...',
      totalPages,
    );
  }

  return range;
};

interface PaginationProps {
  totalPages: number;
}

const PAGE_QUERY_KEY = 'page';

export function Pagination({ totalPages }: PaginationProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentPage = Number(searchParams.get(PAGE_QUERY_KEY)) || 1;

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;

    const currentParams = new URLSearchParams(searchParams.toString());
    currentParams.set(PAGE_QUERY_KEY, String(page));

    router.push(`${pathname}?${currentParams.toString()}`, { scroll: false });
  };

  const paginationRange = useMemo(
    () => getPaginationRange(currentPage, totalPages),
    [currentPage, totalPages],
  );

  if (totalPages <= 1) return null;

  return (
    <div className='flex items-center justify-center gap-x-2 py-6 select-none'>
      {currentPage > 1 && (
        <Button
          type='button'
          onClick={() => handlePageChange(currentPage - 1)}
          aria-label='Prev page'
          size='square'
          color='bordered'
          title='Previos page'
        >
          <LuChevronLeft size={20} className='min-w-5' role='img' aria-hidden />
        </Button>
      )}
      {paginationRange.map((page, index) => {
        if (page === '...') {
          return (
            <Button
              key={`dots-${index}`}
              type='button'
              color='bordered'
              size='square'
            >
              ...
            </Button>
          );
        }

        const isCurrent = Number(page) === currentPage;

        return (
          <Button
            key={`page-${page}`}
            type='button'
            onClick={() => handlePageChange(Number(page))}
            size='square'
            color={isCurrent ? 'purple' : 'bordered'}
          >
            {page}
          </Button>
        );
      })}

      {currentPage < totalPages && (
        <Button
          type='button'
          onClick={() => handlePageChange(currentPage + 1)}
          aria-label='Next page'
          size='square'
          color='bordered'
          title='Next page'
        >
          <LuChevronRight
            size={20}
            className='min-w-5'
            role='img'
            aria-hidden
          />
        </Button>
      )}
    </div>
  );
}
