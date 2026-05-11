import Image from 'next/image';
import clsx from 'clsx';

const defaultAvatar = '/avatar.png';

interface ProfileAvatarProps {
  avatarUrl?: string;
  authorName: string;
  className?: string;
}

export function ProfileAvatar(props: ProfileAvatarProps) {
  const { authorName, avatarUrl, className = '' } = props;
  return (
    <Image
      src={avatarUrl || defaultAvatar}
      alt={authorName}
      fill
      unoptimized
      className={clsx('rounded-full object-cover', className)}
    />
  );
}
