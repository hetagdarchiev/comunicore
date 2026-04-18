import { accCategories } from '../../../model/data/acc-list.data';

import { AccordionItem } from './accordion-item/accordionItem';

export function AccordionsList() {
  return (
    <ul className='grid gap-y-2.5'>
      {accCategories.map((category, index) => (
        <AccordionItem
          category={category}
          index={index}
          key={category.title.toLowerCase()}
        />
      ))}
    </ul>
  );
}
