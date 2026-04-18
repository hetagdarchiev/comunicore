import Link from 'next/link';

import { SubParagraph } from '../../../../model/types/acc-category.interface';

interface Props {
  paragraph: SubParagraph;
}

export function ParagraphItem(props: Props) {
  const { href, title } = props.paragraph;
  return (
    <li className='text-blue-16 text-sm'>
      {href.startsWith('/') ? (
        <Link href={href}>{title}</Link>
      ) : (
        <a href={href} target='_blank' rel='noopener noreferrer'>
          {title}
        </a>
      )}
    </li>
  );
}
