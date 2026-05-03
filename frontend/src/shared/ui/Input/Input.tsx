import { forwardRef, InputHTMLAttributes } from 'react';
import { FieldError } from 'react-hook-form';
import Image from 'next/image';

import { ErrorMessage } from '../ErrorMessage';

interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
  icon: string;
  error?: FieldError;
}

export const Input = forwardRef<HTMLInputElement, IInputProps>((props, ref) => {
  const { className = '', icon, error, ...rest } = props;

  return (
    <div>
      <label
        className={`${className} bg-light-fc focus-within:ring-gray-80/30 flex h-full w-full max-w-125 items-center gap-x-2.5 rounded-sm px-5 py-3 transition-all duration-200 focus-within:ring-2 ${error ? 'border-red-500' : ''}`}
        htmlFor={rest.name}
      >
        {icon && <Image src={icon} alt='' width={24} height={24} unoptimized />}
        <input
          className='text-gray-80 placeholder:text-gray-80 w-full bg-transparent text-[18px] outline-none'
          ref={ref}
          id={rest.name}
          {...rest}
        />
      </label>
      {error?.message && <ErrorMessage error={error.message} />}
    </div>
  );
});

Input.displayName = 'Input';
