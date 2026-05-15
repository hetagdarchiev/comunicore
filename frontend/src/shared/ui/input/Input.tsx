import { forwardRef, InputHTMLAttributes } from 'react';
import clsx from 'clsx';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  isError?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const { className = '', isError, ...rest } = props;

  return (
    <input
      className={clsx(
        'text-gray-80 placeholder:text-gray-80 w-full bg-transparent text-[18px] outline-none',
        isError && 'text-red-600 outline-red-600',
        className,
      )}
      ref={ref}
      id={rest.name}
      {...rest}
    />
  );
});

Input.displayName = 'Input';
