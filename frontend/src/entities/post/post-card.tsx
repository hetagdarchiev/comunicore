'use client';

import { PostProps } from './model/types/post-card.types';
import { PostCommentsLink } from './ui/post-comments-link/post-comments-link';
import { PostContent } from './ui/post-content/post-content';
import { PostHeader } from './ui/post-header/post-header';
import { PostLikeButton } from './ui/post-like-button/post-like-button';
import { PostTags } from './ui/post-tags/post-tags';
import { PostViews } from './ui/post-views';

export const PostCard = ({
  author_name,
  avatarUrl,
  created_at,
  title,
  children,
  tags,
  isLiked = false,
  onLike,
  stats,
  author_id,
  id,
}: PostProps) => (
  <article className='border-gray-ea bg-post-card mx-auto w-full max-w-5xl rounded-md border px-7.5 py-5 shadow-[2px_1px_5px_0px_#00000026]'>
    <PostHeader
      author_id={author_id}
      author_name={author_name}
      avatarUrl={avatarUrl}
      created_at={created_at}
    />

    <PostContent id={id} title={title}>
      {children}
    </PostContent>

    <div className='flex items-start justify-between gap-3 max-sm:flex-col sm:items-center'>
      <PostTags tags={tags ?? []} />

      <div className='text-gray-80 flex items-center gap-4'>
        <PostViews count={stats?.views || 0} />
        <PostCommentsLink count={stats?.comments || 0} postId={id} />
        <PostLikeButton
          count={stats?.likes || 0}
          isLiked={isLiked}
          onLike={onLike}
        />
      </div>
    </div>
  </article>
);
