import { IconType } from 'react-icons/lib';

export interface ListItemLink {
  id: string;
  label: string;
  href: string;
}

export interface ListItemLinkWithIcon extends ListItemLink {
  icon: IconType;
}
