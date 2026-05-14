import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

import { MenuStore } from '../../types/menu-store/menu-store.types';

export const useMenuStore = create<MenuStore>()(
  immer((set) => ({
    isOpen: false,
    burgerRef: { current: null },
    menuRef: { current: null },

    actions: {
      setIsOpen: (value) =>
        set((state) => {
          state.isOpen = value;
        }),
    },
  })),
);
