import { useEffect, useState } from 'react';

export const useWindowResize = (isOpen: boolean) => {
  const [responsiveIsOpen, setResponsiveIsOpen] = useState(isOpen);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setResponsiveIsOpen(true);
      } else {
        setResponsiveIsOpen(isOpen);
      }
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, [isOpen]);

  return {
    responsiveIsOpen,
    setResponsiveIsOpen,
  };
};
