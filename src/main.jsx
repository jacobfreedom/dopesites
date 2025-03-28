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

  const calculatePages = useCallback(
    debounce(() => {
      const appElement = document.querySelector('.app');
      if (appElement) {
        const appHeight = appElement.scrollHeight;
        const viewportHeight = window.innerHeight;
        const pagesValue = appHeight / viewportHeight;
        console.log(`App height: ${appHeight}px, Viewport height: ${viewportHeight}px, Pages ratio: ${pagesValue}`);
        setPages(pagesValue);
      }
    }, 200),
    []
  );

  useEffect(() => {
    calculatePages();

    window.addEventListener('resize', calculatePages, { passive: true });
    document.addEventListener('visibilitychange', () => {
      if (!document.hidden) {
        calculatePages();
      }
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
      window.removeEventListener('resize', calculatePages);
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('visibilitychange', calculatePages);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [calculatePages]);

  return (
    <StrictMode>
      <Canvas
        dpr={[1, 1]}
        gl={{ antialias: false }}
      >
        <ScrollControls pages={pages} damping={0.2} distance={1} >
            <Scroll html>
              <App />
            </Scroll>
        </ScrollControls>
      </Canvas>
      <Analytics />
    </StrictMode>
  );
}

const root = createRoot(document.getElementById('root'));
root.render(<Main />);
