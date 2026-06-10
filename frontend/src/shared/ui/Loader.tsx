import { HTMLAttributes } from 'react';

import { cn } from '../lib/classNames';

interface LoaderProps extends HTMLAttributes<HTMLDivElement> {
  size?: 'sm' | 'md' | 'lg';
}

const sizeClasses = {
  sm: 'h-10 w-10 border-4',
  md: 'h-20 w-20 border-8',
  lg: 'h-30 w-30 border-12',
};

export const Loader = ({ size = 'md', className, ...attrs }: LoaderProps) => (
  <div
    className={cn(
      'flex h-full w-full items-center justify-center bg-transparent p-4',
      className,
    )}
    {...attrs}
  >
    <div
      className={cn(
        'border-purple-67 border-t-purple-9d animate-spin rounded-full',
        sizeClasses[size],
      )}
    />
  </div>
);
