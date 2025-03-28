import { createRoot } from 'react-dom/client'
import './index.scss'
import App from './App.jsx'
import { Analytics } from '@vercel/analytics/react'
import React, { useEffect, useState, useCallback, useRef, StrictMode } from 'react'
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

  const debounce = useCallback((func, wait) => {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), wait);
    };
  }, []);

  const calculatePages = useCallback(() => {
    if (!appElement) return;
    const appHeight = appElement.scrollHeight;
    const viewportHeight = window.innerHeight;
    const calculatedPages = appHeight / viewportHeight;
    setPages(calculatedPages);
  }, [appElement]);

  useEffect(() => {
    if (!appElement) return;
    
    const debouncedCalculate = debounce(calculatePages, 100);
    const resizeObserver = new ResizeObserver(debouncedCalculate);
    
    resizeObserver.observe(appElement);
    calculatePages();

    const handleScroll = () => {
      if (!hasScrolledRef.current) {
        hasScrolledRef.current = true;
      }
      scrollPositionRef.current = window.scrollY || document.documentElement.scrollTop;
    };

    const handleVisibilityChange = () => {
      if (!document.hidden && scrollPositionRef.current !== null) {
        hasScrolledRef.current = false;
        calculatePages();
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('resize', calculatePages, { passive: true });
    window.addEventListener('orientationchange', calculatePages);

    return () => {
      resizeObserver.unobserve(appElement);
      resizeObserver.disconnect();
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('resize', calculatePages);
      window.removeEventListener('orientationchange', calculatePages);
    };
  }, [appElement, calculatePages]);

  return (
    <>
      <StrictMode>
        <Canvas
          dpr={[1, 1]}
          gl={{ alpha: false, antialias: false, stencil: false, depth: false }}
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
