import { Post } from '../../model/types/post.types';

import { cn } from '@/shared/lib/classNames';
import { formatedViews } from '@/shared/lib/helpers/formatedViews';
import { formatTimeAgo } from '@/shared/lib/helpers/formatTimeAgo';
import { ProfileAvatar, Tag } from '@/shared/ui';

interface PostCardProps {
  post: Post;
  tableGrid?: string;
}

export const PostCard = ({
  tableGrid,
  post: { avatarUrl, authorName, answers, chapter, title, views, createdAt },
}: PostCardProps) => (
  <article className={cn(tableGrid)}>
    <header className='flex items-center gap-x-5'>
      <ProfileAvatar
        authorName={authorName}
        avatarUrl={avatarUrl}
        width={50}
        height={50}
        className='size-12.5'
      />
      <div className='grid gap-y-2.25'>
        <h2 className='text-lg leading-5.5'>{title}</h2>
        <div className='text-gray-9e flex items-center gap-x-1.5'>
          <p>{authorName}</p>
          <span className='bg-gray-9e size-0.75 rounded-full' />
          <time dateTime={createdAt} suppressHydrationWarning>
            {formatTimeAgo(createdAt)}
          </time>
        </div>
      </div>
    </header>
    <Tag size='lg' color='green'>
      {chapter}
    </Tag>
    <span className='text-lg'>{answers}</span>
    <span>{formatedViews(views)}</span>
  </article>
);
