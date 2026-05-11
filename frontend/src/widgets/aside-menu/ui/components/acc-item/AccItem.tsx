import { useState } from 'react';

import { AccCatergory } from '../../../model/types/acc.interface';
import { AccButton } from '../acc-button/AccButton';
import { ParagraphsList } from '../paragraphs-list/ParagraphsList';

interface AccordionItemProps {
  category: AccCatergory;
  index: number;
}

export function AccItem(props: AccordionItemProps) {
  const { category, index } = props;
  const [isOpen, setIsOpen] = useState(false);
  return (
    <li
      key={category.title.toLowerCase()}
      className='grid gap-y-2.5 px-7.5 lg:px-5'
    >
      <AccButton
        category={category}
        index={index}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
      <ParagraphsList category={category} index={index} isOpen={isOpen} />
    </li>
  );
}
