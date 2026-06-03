import { ReactNode } from 'react';
import clsx from 'clsx';

interface SkeletonProps {
  isLoading: boolean;
  rounded?: 'sm' | 'md' | 'lg' | 'full';
  className?: string;
  children: ReactNode;
}

export function Skeleton({
  isLoading,
  rounded = 'md',
  className,
  children,
}: SkeletonProps) {
  if (!isLoading) return <>{children}</>;

  return (
    <div className={clsx('relative', className)}>
      <div className='invisible'>{children}</div>
      <div
        className={clsx('absolute inset-0 animate-pulse bg-gray-200', {
          'rounded-sm': rounded === 'sm',
          'rounded-md': rounded === 'md',
          'rounded-lg': rounded === 'lg',
          'rounded-full': rounded === 'full',
        })}
      />
    </div>
  );
}
