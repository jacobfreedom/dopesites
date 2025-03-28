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
 
  const debounce = useCallback((func, wait) => {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), wait);
    };
  }, []);

  const calculatePages = useCallback(
    debounce(() => {
      const appElement = document.querySelector('.app');
      if (appElement) {
        const appHeight = appElement.scrollHeight;
        const viewportHeight = window.innerHeight;
        setPages(appHeight / viewportHeight);
      }
    }, 200),
    [debounce]
  );

  useEffect(() => {
    calculatePages();

    const stableCalculate = calculatePages;
    window.addEventListener('resize', stableCalculate, { passive: true });
    window.addEventListener('orientationchange', stableCalculate);
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'visible') stableCalculate();
    });

    scrollPositionRef.current = window.scrollY || document.documentElement.scrollTop;

    const handleScroll = () => {
      if (!hasScrolledRef.current) {
        hasScrolledRef.current = true;
      }
      
      scrollPositionRef.current = window.scrollY || document.documentElement.scrollTop;
    };

    const handleVisibilityChange = () => {
      if (!document.hidden && scrollPositionRef.current !== null) {
        hasScrolledRef.current = false;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      window.removeEventListener('resize', stableCalculate);
      window.removeEventListener('orientationchange', stableCalculate);
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('visibilitychange', stableCalculate);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [calculatePages]);

  return (
    <>
      <StrictMode>
        <Canvas
          dpr={[1, 1]}
          gl={{ antialias: false }}
        >
          <ScrollControls pages={pages} damping={0.2} distance={2.1}>
            <Scroll html>
              <App />
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
