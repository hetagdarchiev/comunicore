import Image, { ImageProps } from 'next/image';

import { isApiUrl } from '../guards/isApiUrl.guard';
import { cn } from '../lib/classNames';

const defaultAvatar = '/avatar.png';

interface ProfileAvatarProps extends Omit<ImageProps, 'src' | 'alt'> {
  avatarUrl?: string | null;
  authorName: string;
}

export function ProfileAvatar(props: ProfileAvatarProps) {
  const {
    authorName,
    avatarUrl,
    className,
    fill,
    width = 250,
    height = 250,
    ...attrs
  } = props;

  const validAvatarUrl = isApiUrl(avatarUrl) ? avatarUrl : defaultAvatar;

  return (
    <Image
      src={validAvatarUrl}
      alt={`Аватар ${authorName}`}
      priority
      {...attrs}
      fill={fill}
      {...(!fill && { width, height })}
      className={cn('rounded-full object-cover', className)}
    />
  );
}
