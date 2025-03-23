import React, { useEffect, useState, useCallback } from 'react'
import './App.scss'
import { Canvas } from '@react-three/fiber'
import { ScrollControls, Scroll } from '@react-three/drei'
import Projects from './components/Projects'
import Header from './components/Header'
import Footer from './components/Footer'

function App() {
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
        if (Math.abs(pagesValue - pages) > 0.01) {
          console.log(`App height: ${appHeight}px, Viewport height: ${viewportHeight}px, Pages ratio: ${pagesValue}`);
          setPages(pagesValue);
        }
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
    <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        dpr={[1, 1]}
      >
        <ScrollControls pages={pages} damping={0.2} distance={1}>
          <Scroll html>
            <div className="app">
              <Header />
              <Projects />
              <Footer />
            </div>
          </Scroll>
        </ScrollControls>
      </Canvas>
  )
}

export default App
