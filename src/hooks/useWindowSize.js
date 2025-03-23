import { useState, useEffect, useCallback } from 'react';

export function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
  });

  // Debounce function to limit the frequency of updates
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

  // Memoize the resize handler with useCallback
  const handleResize = useCallback(
    debounce(() => {
      // Only update if the width has actually changed
      if (window.innerWidth !== windowSize.width) {
        setWindowSize({
          width: window.innerWidth,
        });
      }
    }, 100), // 100ms debounce time
    [windowSize.width]
  );

  useEffect(() => {
    // Use passive event listener for better performance
    window.addEventListener('resize', handleResize, { passive: true });
    return () => window.removeEventListener('resize', handleResize);
  }, [handleResize]);

  return windowSize;
}