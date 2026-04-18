import { Dispatch, SetStateAction } from 'react';
import Image from 'next/image';

import arrowDown from '@/shared/assets/icons/arrow-down.svg';

import { AccCatergory } from '../../../model/types/acc-category.interface';

interface Props {
  category: AccCatergory;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  index: number;
}

export function ListButton(props: Props) {
  const { category, index, setIsOpen, isOpen } = props;
  return (
    <h3 className='text-gray-80'>
      <button
        type='button'
        aria-controls={`accordion-panel-${index}`}
        className='flex w-full items-center gap-x-1.5'
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className='size-5'>
          <Image
            src={category.icon}
            alt=''
            width={20}
            height={20}
            aria-hidden={true}
          />
        </span>
        <span>{category.title}</span>
        <span className={`size-5 duration-200 ${isOpen ? 'rotate-180' : ''}`}>
          <Image
            src={arrowDown}
            alt=''
            width={20}
            height={20}
            aria-hidden={true}
          />
        </span>
      </button>
    </h3>
  );
}
