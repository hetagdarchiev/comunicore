import { Dispatch, SetStateAction } from 'react';
import { LuChevronDown } from 'react-icons/lu';

import { AccCatergory } from '../../../model/types/acc.interface';

interface Props {
  category: AccCatergory;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  index: number;
}

export function AccButton(props: Props) {
  const {
    category: { Icon, title },
    index,
    setIsOpen,
    isOpen,
  } = props;
  return (
    <h3 className='text-gray-80'>
      <button
        type='button'
        aria-controls={`accordion-panel-${index}`}
        className='flex w-full items-center gap-x-1.5'
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className='size-5'>
          <Icon
            width={20}
            height={20}
            role='img'
            className='min-h-5 min-w-5'
            aria-hidden={true}
          />
        </span>
        <span>{title}</span>
        <span className={`size-5 duration-200 ${isOpen ? 'rotate-180' : ''}`}>
          <LuChevronDown
            width={20}
            height={20}
            role='img'
            className='min-h-5 min-w-5'
            aria-hidden={true}
          />
        </span>
      </button>
    </h3>
  );
}
