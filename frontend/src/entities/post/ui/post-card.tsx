'use client';

import { PostProps } from '../model/types/post-card.types';

import { PostCommentsLink } from './post-comments-link/post-comments-link';
import { PostContent } from './post-content/post-content';
import { PostHeader } from './post-header/post-header';
import { PostLikeButton } from './post-like-button/post-like-button';
import { PostTags } from './post-tags/post-tags';
import { PostViews } from './post-views';

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
}: PostProps) => (
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
