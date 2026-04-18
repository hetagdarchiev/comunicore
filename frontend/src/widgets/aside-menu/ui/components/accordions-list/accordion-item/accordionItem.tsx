'use client';

import { useState } from 'react';

import { AccCatergory } from '../../../../model/types/acc-category.interface';
import { ListButton } from '../../list-button/listButton';
import { ParagraphsList } from '../../paragraphs-list/paragraphsList';

interface Props {
  category: AccCatergory;
  index: number;
}
export function AccordionItem(props: Props) {
  const { category, index } = props;
  const [isOpen, setIsOpen] = useState(false);
  return (
    <li className='grid gap-y-2.5 px-5'>
      <ListButton
        category={category}
        index={index}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
      <ParagraphsList category={category} index={index} isOpen={isOpen} />
    </li>
  );
}
