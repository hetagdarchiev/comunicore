import { AccCatergory } from '../../../model/types/acc-category.interface';

import { ParagraphItem } from './paragraph-item/paragraphItem';

interface Props {
  category: AccCatergory;
  isOpen: boolean;
  index: number;
}

export function ParagraphsList(props: Props) {
  const { subparagraphs, title } = props.category;

  return (
    <ul
      id={`accordion-panel-${props.index}`}
      style={{ listStyle: 'disc', paddingInline: '1.7rem' }}
      inert={!props.isOpen}
      aria-hidden={!props.isOpen}
      className={`grid origin-top list-outside gap-y-2.5 duration-200 ${props.isOpen ? 'h-full scale-y-100' : 'h-0 scale-y-0'}`}
    >
      {subparagraphs.map((paragraph) => (
        <ParagraphItem
          key={`${title.toLowerCase()}-${paragraph.title.toLowerCase()}`}
          paragraph={paragraph}
        />
      ))}
    </ul>
  );
}
