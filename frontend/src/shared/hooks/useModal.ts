import { RefObject, useEffect, useState } from 'react';

const UNIQUE_STOP_CLOSE_SELECTORE = '[data-select-content]';

type ModalElement = RefObject<HTMLElement | null>;

interface ModalOptions {
  autoClose?: boolean;
  initialState?: boolean;
  closeByEsc?: boolean;
}

export const useModal = (
  modal: ModalElement,
  burger?: ModalElement,
  options: ModalOptions = {},
) => {
  const { autoClose = true, initialState = false, closeByEsc = true } = options;
  const [modalOpen, setModalOpen] = useState(initialState);

  useEffect(() => {
    if (!autoClose) return;

    const closeModal = (event: MouseEvent) => {
      if (!modalOpen) return;
      const target = event.target as HTMLElement;
      const currentModal = modal.current;
      const currentBurger = burger?.current;

      if (currentModal?.contains(target)) return;

      if (currentBurger?.contains(target)) return;
      if (target.closest(UNIQUE_STOP_CLOSE_SELECTORE)) return;

      setModalOpen(false);
    };

    document.addEventListener('click', closeModal);
    return () => document.removeEventListener('click', closeModal);
  }, [modalOpen, modal, burger, autoClose]);

  useEffect(() => {
    if (!closeByEsc || !modalOpen) return;

    const handlerEsc = (event: KeyboardEvent) => {
      const { code } = event;
      if (modalOpen && code === 'Escape') {
        setModalOpen(false);
      }
    };

    document.addEventListener('keydown', handlerEsc);

    return () => document.removeEventListener('keydown', handlerEsc);
  }, [modalOpen, closeByEsc]);

  return {
    modalOpen,
    setModalOpen,
  };
};
