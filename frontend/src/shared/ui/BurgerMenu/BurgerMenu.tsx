'use client';

import { ButtonHTMLAttributes, Dispatch, SetStateAction } from 'react';
import clsx from 'clsx';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  controls: string;
}

export function BurgerMenu(props: Props) {
  const { isOpen, setIsOpen, className = '', controls, ...attrs } = props;

  return (
    <button
      type='button'
      onClick={() => setIsOpen(!isOpen)}
      aria-label='Menu'
      aria-expanded={isOpen}
      aria-controls={controls}
      {...attrs}
      className={clsx(
        'relative flex size-4 flex-col justify-center gap-y-1',
        'before:absolute before:top-1/2 before:left-1/2 before:size-7 before:-translate-1/2 before:content-[""]',
        className,
      )}
    >
      {Array.from({ length: 3 }).map((_, index) => (
        <span
          key={`line-${index}`}
          className='h-0.5 w-full rounded-lg bg-white'
        >
          {''}
        </span>
      ))}
    </button>
  );
}
