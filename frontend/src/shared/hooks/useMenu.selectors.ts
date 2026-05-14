import { useShallow } from 'zustand/react/shallow';

import { useMenuStore } from '../store/menu-store/menu.store';

export const useMenuIsOpen = () => useMenuStore((state) => state.isOpen);

// 2. Селектор для экшенов (они никогда не меняются, поэтому компонент не будет ререндериться)
export const useMenuActions = () => useMenuStore((state) => state.actions);

// 3. Селектор для рефов
export const useMenuRefs = () =>
  useMenuStore(
    useShallow((state) => ({
      menuRef: state.menuRef,
      burgerRef: state.burgerRef,
    })),
  );
