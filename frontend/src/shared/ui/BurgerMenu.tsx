'use client';

import { ButtonHTMLAttributes, RefObject } from 'react';

import { cn } from '../lib/classNames';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  ref?: RefObject<HTMLButtonElement | null>;
  controls: string;
}

export function BurgerMenu(props: Props) {
  const { isOpen, setIsOpen, className, controls, ref, ...attrs } = props;

  return (
    <button
      type='button'
      onClick={() => setIsOpen(!isOpen)}
      aria-label='Menu'
      aria-expanded={isOpen}
      aria-controls={controls}
      ref={ref}
      {...attrs}
      className={cn(
        'relative flex size-4 flex-col justify-center gap-y-1',
        'before:absolute before:top-1/2 before:left-1/2 before:size-7 before:-translate-1/2 before:content-[""]',
        className,
      )}
    >
      <span className='h-0.5 w-full rounded-lg bg-white' />
      <span className='h-0.5 w-full rounded-lg bg-white' />
      <span className='h-0.5 w-full rounded-lg bg-white' />
    </button>
  );
}
