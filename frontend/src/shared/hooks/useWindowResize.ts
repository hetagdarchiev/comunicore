import { useEffect, useState } from 'react';

export const useWindowResize = (isOpen: boolean, windowSize: number = 1024) => {
  const [responsiveIsOpen, setResponsiveIsOpen] = useState(isOpen);

  useEffect(() => {
    const media = window.matchMedia(`(min-width: ${windowSize}px)`);

    const handleMediaChange = (e: MediaQueryListEvent | MediaQueryList) => {
      if (e.matches) {
        setResponsiveIsOpen(true);
      } else {
        setResponsiveIsOpen(isOpen);
      }
    };

    handleMediaChange(media);

    media.addEventListener('change', handleMediaChange);

    return () => media.removeEventListener('change', handleMediaChange);
  }, [isOpen, windowSize]);

  return {
    responsiveIsOpen,
    setResponsiveIsOpen,
  };
};
