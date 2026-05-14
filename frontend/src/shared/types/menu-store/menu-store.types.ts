import { RefObject } from 'react';

interface MenuState {
  isOpen: boolean;
  burgerRef: RefObject<HTMLButtonElement | null>;
  menuRef: RefObject<HTMLElement | null>;
}

interface MenuActions {
  setIsOpen: (isOpen: boolean) => void;
}

export interface MenuStore extends MenuState {
  actions: MenuActions;
}
