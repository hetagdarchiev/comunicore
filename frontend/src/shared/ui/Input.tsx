import { forwardRef, InputHTMLAttributes } from 'react';

import { cn } from '../lib/classNames';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  isError?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const { className, isError, ...rest } = props;

  return (
    <input
      className={cn(
        'text-gray-9e placeholder:text-gray-9e bg-dark-1b rounded-[10px] px-4 py-2.5 text-[16px] outline-none',
        isError && 'outline-red-ff',
        className,
      )}
      ref={ref}
      id={rest.name}
      {...rest}
    />
  );
});

Input.displayName = 'Input';
