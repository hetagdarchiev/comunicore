interface MenuState {
  isOpen: boolean;
}

interface MenuActions {
  setIsOpen: (isOpen: boolean) => void;
}

export interface MenuStore extends MenuState {
  actions: MenuActions;
}
