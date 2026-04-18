'use client';

import { Post } from '../model/types/post.types';

import { PostCommentsLink } from './components/post-comments-link/postCommentsLink';
import { PostContent } from './components/post-content/postContent';
import { PostHeader } from './components/post-header/postHeader';
import { PostLikeButton } from './components/post-like-button/postLikeButton';
import { PostTags } from './components/post-tags/postTags';
import { PostViews } from './components/post-views/postViews';

export const PostCard = ({
  authorName,
  avatarUrl,
  createdAt,
  title,
  children,
  tags,
  isLiked = false,
  onLike,
  stats,
  authorId,
  id,
}: Post) => (
  <article className='border-gray-ea bg-post-card mx-auto w-full max-w-5xl rounded-md border px-7.5 py-5 shadow-[2px_1px_5px_0px_#00000026]'>
    <PostHeader
      authorId={authorId}
      authorName={authorName}
      avatarUrl={avatarUrl}
      createdAt={createdAt}
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
