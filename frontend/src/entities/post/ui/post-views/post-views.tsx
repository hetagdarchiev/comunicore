import { memo } from 'react';
import Image from 'next/image';

import eyeIcon from '@/assets/icons/eye.svg';

export const PostViews = memo(({ count }: { count: number }) => (
  <div className='text-gray-80 flex items-center gap-1.5 transition-colors hover:text-slate-600'>
    <Image
      src={eyeIcon}
      alt='Views'
      className='h-4 w-4'
      aria-hidden='true'
      unoptimized
    />
    <span className='text-sm font-medium'>{count}</span>
  </div>
));

PostViews.displayName = 'PostViews';
