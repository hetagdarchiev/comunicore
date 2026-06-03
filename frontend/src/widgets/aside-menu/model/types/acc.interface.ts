import { IconType } from 'react-icons/lib';

export interface SubParagraph {
  title: string;
  href: string;
}

export interface AccCatergory {
  title: string;
  Icon: IconType;
  subparagraphs: SubParagraph[];
}
