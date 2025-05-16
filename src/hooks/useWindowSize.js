import { useState, useEffect, useCallback, useMemo } from 'react';

// Optimized debounce function that doesn't recreate on every render
const createDebounce = (wait = 100) => {
  let timeout;
  return (func) => {
    const debounced = (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), wait);
    };
    
    debounced.cancel = () => {
      clearTimeout(timeout);
    };
    
    return debounced;
  };
};

export function useWindowSize() {
  // Use primitive state instead of object to prevent unnecessary re-renders
  const [width, setWidth] = useState(window.innerWidth);
  
  // Create stable debounce function that doesn't change on re-renders
  const debounceFn = useMemo(() => createDebounce(200), []);
  
  // Create stable resize handler with proper dependencies
  const handleResize = useCallback(
    debounceFn(() => {
      const currentWidth = window.innerWidth;
      if (currentWidth !== width) {
        setWidth(currentWidth);
      }
    }),
    [width, debounceFn]
  );

  useEffect(() => {
    // Add passive event listener for better performance
    window.addEventListener('resize', handleResize, { passive: true });
    
    // Proper cleanup with the cancel method
    return () => {
      handleResize.cancel();
      window.removeEventListener('resize', handleResize);
    };
  }, [handleResize]);

  // Return a memoized object to prevent unnecessary re-renders in consuming components
  return useMemo(() => ({ width }), [width]);
}