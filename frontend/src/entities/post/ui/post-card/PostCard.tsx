import { PostCommentsLink } from './components/post-comments-link/PostCommentsLink';
import { PostContent } from './components/post-content/PostContent';
import { PostHeader } from './components/post-header/PostHeader';
import { PostShareButton } from './components/post-share-button/PostShareButton';
import { PostTags } from './components/post-tags/PostTags';
import { PostViews } from './components/post-views/PostViews';

import { ThreadListItem } from '@/shared/api/generated';

export const PostCard = ({
  authorId,
  authorName,
  authorAvatarUrl,
  createdAt,
  title,
  content,
  id,
}: ThreadListItem) => (
  <article className='border-gray-ea bg-post-card min-w-75 rounded-md border px-7.5 py-5 shadow-[2px_1px_5px_0px_#00000026]'>
    <PostHeader
      authorId={authorId}
      authorName={authorName}
      avatarUrl={authorAvatarUrl}
      createdAt={createdAt}
    />

    <PostContent id={id} title={title}>
      {content}
    </PostContent>

    <div className='flex items-start justify-between gap-3 max-sm:flex-col sm:items-center'>
      <PostTags tags={/* tags ?? */ ['frontend', 'backand', 'test']} />

      <div className='text-gray-80 flex items-center gap-4'>
        <PostViews count={/*stats?.views || */ 0} />
        <PostCommentsLink count={/*stats?.comments || */ 0} postId={id} />
        <PostShareButton count={/*stats?.shares || */ 0} />
      </div>
    </div>
  </article>
);
