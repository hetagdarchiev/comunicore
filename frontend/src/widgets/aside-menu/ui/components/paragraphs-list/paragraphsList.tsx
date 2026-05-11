import Link from 'next/link';

import { AccCatergory } from '../../../model/types/acc.interface';

interface Props {
  category: AccCatergory;
  isOpen: boolean;
  index: number;
}

export function ParagraphsList(props: Props) {
  const { subparagraphs } = props.category;

  return (
    <ul
      id={`accordion-panel-${props.index}`}
      style={{ listStyle: 'disc', paddingInline: '1.7rem' }}
      inert={!props.isOpen}
      aria-hidden={!props.isOpen}
      className={`grid origin-top list-outside gap-y-2.5 duration-200 ${props.isOpen ? 'h-full scale-y-100' : 'h-0 scale-y-0'}`}
    >
      {subparagraphs.map(({ href, title }) => {
        const isOtherPage = href.startsWith('http');

        const itemKey = title.toLowerCase();

        if (isOtherPage) {
          return (
            <Link key={itemKey} href={href} className='text-blue-16 text-sm'>
              {title}
            </Link>
          );
        }

        return (
          <li key={itemKey} className='text-blue-16 text-sm'>
            <a href={href} target='_blank' rel='noopener noreferrer'>
              {title}
            </a>
          </li>
        );
      })}
    </ul>
  );
}
