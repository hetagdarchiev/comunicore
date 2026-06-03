import { memo } from 'react';
import { LuArrowUp } from 'react-icons/lu';

interface PostShareButtonProps {
  count: number;
}

// Implement share functionality
export const PostShareButton = memo(({ count }: PostShareButtonProps) => (
  <button
    type='button'
    className='text-gray-80 flex cursor-pointer items-center gap-1.5 transition-colors hover:text-slate-600'
  >
    <LuArrowUp
      width={16}
      height={16}
      aria-label='Shares'
      className={`h-4 w-4 transition-transform duration-200`}
    />
    <span className='text-sm font-medium'>{count}</span>
  </button>
));

PostShareButton.displayName = 'PostShareButton';
