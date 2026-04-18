import { StaticImageData } from 'next/image';

export interface SubParagraph {
  title: string;
  href: string;
}

export interface AccCatergory {
  title: string;
  icon: StaticImageData;
  subparagraphs: SubParagraph[];
}
