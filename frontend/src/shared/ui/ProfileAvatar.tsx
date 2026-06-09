import Image from 'next/image';

import { cn } from '../lib/classNames';

const defaultAvatar = '/avatar.png';

interface ProfileAvatarProps {
  avatarUrl?: string;
  authorName: string;
  className?: string;
  fill?: boolean;
  unoptimized?: boolean;
  width?: number;
  height?: number;
}

export function ProfileAvatar(props: ProfileAvatarProps) {
  const { authorName, avatarUrl, className, ...attrs } = props;
  return (
    <Image
      src={avatarUrl || defaultAvatar}
      alt={authorName}
      {...attrs}
      className={cn('rounded-full object-cover', className)}
    />
  );
}
