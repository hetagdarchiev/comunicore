import { memo } from 'react';
import { LuEye } from 'react-icons/lu';

export const PostViews = memo(({ count }: { count: number }) => (
  <div className='text-gray-80 flex items-center gap-1.5 transition-colors hover:text-slate-600'>
    <LuEye
      width={16}
      height={16}
      aria-label='Views'
      className='min-h-4 min-w-4'
      role='img'
    />
    <span className='text-sm font-medium'>{count}</span>
  </div>
));

PostViews.displayName = 'PostViews';
