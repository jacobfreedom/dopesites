import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.scss'
import App from './App.jsx'
import { Analytics } from '@vercel/analytics/react'
import React from 'react'
import React, { useEffect, useState, useCallback } from 'react'
import { Canvas } from '@react-three/fiber'
import { ScrollControls, Scroll } from '@react-three/drei'

function Main() {
  const [pages, setPages] = useState(0);
 
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
    [pages]
  );

  useEffect(() => {
    calculatePages();

    window.addEventListener('resize', calculatePages, { passive: true });

    return () => {
      window.removeEventListener('resize', calculatePages);
    };
  }, [calculatePages]);

  return (
    <StrictMode>
      <Canvas
        dpr={[1, 1]}
        gl={{ antialias: false }}
      >
        <ScrollControls pages={pages} damping={0.2} distance={1} prepend>
          <Scroll html>
            <App />
          </Scroll>
        </ScrollControls>
      </Canvas>
      <Analytics />
    </StrictMode>
  );
}

createRoot(document.getElementById('root')).render(<Main />)
