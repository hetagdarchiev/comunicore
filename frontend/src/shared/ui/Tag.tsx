import { HTMLAttributes, ReactNode } from 'react';

import { cn } from '../lib/classNames';

type TagColor =
  | 'purple'
  | 'orange'
  | 'blue'
  | 'green'
  | 'dark-purple'
  | 'cyan'
  | 'dark';

type TagSize = 'sm' | 'md' | 'lg' | 'xl';

export interface TagProps extends HTMLAttributes<HTMLSpanElement> {
  children?: ReactNode;
  color?: TagColor;
  size?: TagSize;
}

const colorStyles: Record<TagColor, string> = {
  purple: 'border bg-purple-67/20 border-gray-9e/10 text-pink-d5',
  'dark-purple': 'border bg-purple-86/20 border-gray-9e/10 text-purple-86',
  blue: 'border bg-blue-3e/20 border-gray-9e/10 text-blue-92',
  cyan: 'border bg-green-39/20 border-gray-9e/10 text-green-81',
  green: 'border bg-green-39/20 border-gray-9e/10 text-green-00',
  orange: 'border bg-orange-ff/20 border-gray-9e/10 text-orange-ff',
  dark: 'text-gray-9e bg-dark-1b/50 border border-gray-9e/10 font-normal',
};

const sizeStyles: Record<TagSize, string> = {
  sm: 'px-[20px] py-[10px] text-[14px]' /* mozno meniat */,
  md: 'px-1.5 h-7.5 text-sm',
  lg: 'px-4 h-7.5 text-sm',
  xl: 'px-[50px] py-[20px] text-[18px]' /* mozno meniat */,
};

export function Tag(props: TagProps) {
  const {
    children,
    className,
    color = 'purple',
    size = 'md',
    ...restProps
  } = props;

  const commonClassName = cn(
    'inline-flex items-center justify-center w-fit',
    'rounded-[5px] text-center font-semibold',
    colorStyles[color],
    sizeStyles[size],
    className,
  );
  return (
    <span className={commonClassName} {...restProps}>
      {children}
    </span>
  );
}
