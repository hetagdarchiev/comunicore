import { ComponentPropsWithoutRef } from 'react';

import { cn } from '../lib/classNames';

type ContainerProps = ComponentPropsWithoutRef<'div'>;

export const containerClassName = 'px-5 sm:px-8 lg:px-27.5';

export function Container(props: ContainerProps) {
  const { className, ...restProps } = props;

  return <div className={cn(containerClassName, className)} {...restProps} />;
}
