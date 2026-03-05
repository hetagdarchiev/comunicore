import { forwardRef, InputHTMLAttributes } from 'react';
import Image from 'next/image';

interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
  icon: string;
}

export const Input = forwardRef<HTMLInputElement, IInputProps>((props, ref) => {
  const { className = '', icon, ...rest } = props;

  return (
    <label
      className={`${className} bg-light-fc focus-within:ring-gray-80/30 flex h-full w-full max-w-125 items-center gap-x-2.5 rounded-sm px-5 py-3 focus-within:ring-2`}
      htmlFor={rest.name}
    >
      <Image src={icon} alt='' width={24} height={24} />
      <input
        className='text-gray-80 placeholder:text-gray-80 w-full bg-transparent text-[18px] outline-none'
        ref={ref}
        id={rest.name}
        {...rest}
      />
    </label>
  );
});

Input.displayName = 'Input';
