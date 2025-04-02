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
    if (appElement) {
      const appHeight = appElement.scrollHeight;
      const viewportHeight = window.innerHeight;
      const calculatedPages = appHeight / viewportHeight;
      console.log('Calculating pages:', {
        appHeight,
        viewportHeight,
        calculatedPages,
        scrollTop: appElement.scrollTop,
        clientHeight: appElement.clientHeight
      });
      setPages(calculatedPages);
    }
  }, [appElement]);



  useEffect(() => {
    if (!appElement) return;

    const debouncedCalculate = debounce(calculatePages, 100);
    const resizeObserver = new ResizeObserver(debouncedCalculate);

    resizeObserver.observe(appElement);
    calculatePages();

    return () => {
      resizeObserver.unobserve(appElement);
      resizeObserver.disconnect();
    };
  }, [calculatePages, appElement]);



  useEffect(() => {
    if (appElement) {
      calculatePages();
    }
  }, [calculatePages, appElement]);

  useEffect(() => {
    calculatePages();

    scrollPositionRef.current = window.scrollY || document.documentElement.scrollTop;

    const handleScroll = () => {
      if (!hasScrolledRef.current) {
        hasScrolledRef.current = true;
        return;
      }

      scrollPositionRef.current = window.scrollY || document.documentElement.scrollTop;
    };

    const handleVisibilityChange = () => {
      if (!document.hidden && scrollPositionRef.current !== null) {
        hasScrolledRef.current = false;
        requestAnimationFrame(() => {
          window.scrollTo(0, scrollPositionRef.current);
        });
      }
    };

    const stableCalculate = calculatePages;

    window.addEventListener('scroll', handleScroll, { passive: true });
    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('resize', stableCalculate, { passive: true });
    window.addEventListener('orientationchange', stableCalculate);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('resize', stableCalculate);
      window.removeEventListener('orientationchange', stableCalculate);
    };
  }, [calculatePages]);

  return (
    <>
      <StrictMode>
        <div>
        <Canvas
          dpr={[1, 1]}
          gl={{ alpha: false, antialias: false, stencil: false, depth: false }}
        >
          <ScrollControls pages={pages} damping={0.2} distance={2.1}>
            <Scroll>
              {/* <App ref={appRef} /> */}
            </Scroll>
          </ScrollControls>
        </Canvas>

        </div>

      </StrictMode>
      <Analytics />
    </>
  );
}

const root = createRoot(document.getElementById('root'));
root.render(<Main />);
