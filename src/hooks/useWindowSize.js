import { useState, useEffect, useCallback } from 'react';

export function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
  });

  const debounce = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  };

  const handleResize = useCallback(
    debounce(() => {
      if (window.innerWidth !== windowSize.width) {
        setWindowSize({
          width: window.innerWidth,
        });
      }
    }, 100),
    [windowSize.width]
  );

  useEffect(() => {
    window.addEventListener('resize', handleResize, { passive: true });
    return () => window.removeEventListener('resize', handleResize);
  }, [handleResize]);

  return windowSize;
}