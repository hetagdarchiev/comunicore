import { cn } from '../lib/classNames';

interface LoaderProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const sizeClasses = {
  sm: 'h-10 w-10 border-4',
  md: 'h-20 w-20 border-8',
  lg: 'h-30 w-30 border-12',
};

export const Loader = ({ size = 'md', className }: LoaderProps) => (
  <div
    className={cn(
      'flex h-full w-full items-center justify-center bg-transparent p-4',
      className,
    )}
  >
    <div
      className={cn(
        'border-gray-ea border-t-blue-16 animate-spin rounded-full',
        sizeClasses[size],
      )}
    />
  </div>
);
