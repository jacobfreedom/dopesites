import { createRoot } from 'react-dom/client'
import './index.scss'
import App from './App.jsx'
import { Analytics } from '@vercel/analytics/react'
import React, { useEffect, useState, useCallback, useRef, StrictMode, useMemo } from 'react'
import { Canvas } from '@react-three/fiber'
import { ScrollControls, Scroll } from '@react-three/drei'

function Main() {
  const [pages, setPages] = useState(1);
  const scrollPositionRef = useRef(null);
  const hasScrolledRef = useRef(false);
  const [appElement, setAppElement] = useState(null);
  const appRef = useCallback((node) => {
    if (node) setAppElement(node);
  }, []);

  // Optimized debounce function with proper cleanup
  const debounce = useCallback((func, wait) => {
    let timeout;
    const debouncedFn = (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), wait);
    };
    
    debouncedFn.cancel = () => {
      clearTimeout(timeout);
    };
    
    return debouncedFn;
  }, []);

  // Optimized page calculation with throttling to avoid excessive calculations
  const calculatePages = useCallback(() => {
    if (appElement) {
      const appHeight = appElement.scrollHeight;
      const viewportHeight = window.innerHeight;
      const calculatedPages = appHeight / viewportHeight;
      
      // Only update state if the value has changed significantly
      if (Math.abs(calculatedPages - pages) > 0.01) {
        setPages(calculatedPages);
      }
    }
  }, [appElement, pages]);



  // Memoize the debounced calculate function to prevent recreation
  const debouncedCalculate = useMemo(() => debounce(calculatePages, 200), [calculatePages]);

  useEffect(() => {
    if (!appElement) return;

    const resizeObserver = new ResizeObserver(debouncedCalculate);
    resizeObserver.observe(appElement);
    calculatePages();

    return () => {
      debouncedCalculate.cancel();
      resizeObserver.unobserve(appElement);
      resizeObserver.disconnect();
    };
  }, [calculatePages, appElement, debouncedCalculate]);



  // This effect is redundant as we already calculate pages in the ResizeObserver effect

  useEffect(() => {
    // Store initial scroll position
    scrollPositionRef.current = window.scrollY || document.documentElement.scrollTop;

    // Optimized scroll handler with passive event listener
    const handleScroll = () => {
      if (!hasScrolledRef.current) {
        hasScrolledRef.current = true;
        return;
      }
      
      // Use requestAnimationFrame to optimize scroll performance
      requestAnimationFrame(() => {
        scrollPositionRef.current = window.scrollY || document.documentElement.scrollTop;
      });
    };

    // Handle visibility change (tab switching)
    const handleVisibilityChange = () => {
      if (!document.hidden && scrollPositionRef.current !== null) {
        hasScrolledRef.current = false;
        requestAnimationFrame(() => {
          window.scrollTo(0, scrollPositionRef.current);
        });
      }
    };

    // Use the memoized debounced function for resize events
    window.addEventListener('scroll', handleScroll, { passive: true });
    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('resize', debouncedCalculate, { passive: true });
    window.addEventListener('orientationchange', debouncedCalculate);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('resize', debouncedCalculate);
      window.removeEventListener('orientationchange', debouncedCalculate);
    };
  }, [debouncedCalculate]);

  return (
    <>
      <StrictMode>
        <Canvas
          dpr={[1, 1.5]}
          gl={{ 
            alpha: false, 
            antialias: false, 
            stencil: false, 
            depth: false,
            powerPreference: 'high-performance'
          }}
          performance={{ min: 0.5 }}
        >
          <ScrollControls pages={pages} damping={0.2} distance={2.1}>
            <Scroll html>
              <App ref={appRef} />
            </Scroll>
          </ScrollControls>
        </Canvas>
      </StrictMode>
      <Analytics />
    </>
  );
}

const root = createRoot(document.getElementById('root'));
root.render(<Main />);
