import React, { useEffect, useState } from 'react'
import './App.scss'
import { Canvas } from '@react-three/fiber'
import { ScrollControls, Scroll } from '@react-three/drei'
import Projects from './components/Projects'
import Header from './components/Header'

function App() {
  const [pages, setPages] = useState(3);

  useEffect(() => {
    const calculatePages = () => {
      const appElement = document.querySelector('.app');
      if (appElement) {
        const appHeight = appElement.scrollHeight;
        const viewportHeight = window.innerHeight;
        const pagesValue = appHeight / viewportHeight;
        console.log(`App height: ${appHeight}px, Viewport height: ${viewportHeight}px, Pages ratio: ${pagesValue}`);
        setPages(pagesValue);
      }
    };

    calculatePages();
    
    const timeoutId = setTimeout(() => {
      calculatePages();
    }, 200);

    window.addEventListener('resize', calculatePages);

    return () => {
      window.removeEventListener('resize', calculatePages);
      clearTimeout(timeoutId);
    };
  }, []);

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
            </div>
          </Scroll>
        </ScrollControls>
      </Canvas>
  )
}

export default App
