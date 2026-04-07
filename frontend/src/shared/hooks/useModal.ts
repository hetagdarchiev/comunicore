import { RefObject, useEffect, useState } from 'react';

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

  // close modal by outside click
  useEffect(() => {
    if (!autoClose || !modalOpen) return;

    const closeModal = (event: MouseEvent) => {
      const target = event.target as Node;
      const currentModal = modal.current;
      const currentBurger = burger?.current;

      const clickedOutsideModal =
        currentModal && !currentModal.contains(target);
      const clickedOutsideBurger =
        !currentBurger || !currentBurger.contains(target);

      if (clickedOutsideModal && clickedOutsideBurger) {
        setModalOpen(false);
      }
    };

    document.addEventListener('mousedown', closeModal);

    return () => document.removeEventListener('mousedown', closeModal);
  }, [modalOpen, modal, burger, autoClose]);

  // close modal by Esc
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
