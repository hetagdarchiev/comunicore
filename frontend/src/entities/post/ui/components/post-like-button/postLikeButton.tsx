import { memo } from 'react';
import Image from 'next/image';

import likeIcon from '@/assets/icons/arrow-down.svg';

interface PostLikeButtonProps {
  count: number;
  isLiked: boolean;
  onLike: () => void;
}

export const PostLikeButton = memo(
  ({ count, isLiked, onLike }: PostLikeButtonProps) => (
    <button
      type='button'
      onClick={onLike}
      className='text-gray-80 flex cursor-pointer items-center gap-1.5 transition-colors hover:text-slate-600'
    >
      <Image
        src={likeIcon}
        width={16}
        height={16}
        alt='Likes'
        className={`h-4 w-4 transition-transform duration-200 ${isLiked ? 'rotate-0' : 'rotate-180'}`}
        unoptimized
      />
      <span className='text-sm font-medium'>{count}</span>
    </button>
  ),
);

PostLikeButton.displayName = 'PostLikeButton';
