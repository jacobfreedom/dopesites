import React, { useEffect, useState } from 'react'
import './App.scss'
import { Canvas } from '@react-three/fiber'
import { ScrollControls, Scroll } from '@react-three/drei'
import Projects from './components/Projects'
import HeaderCenter from './components/HeaderCenter'
import FontPreloader from './components/FontPreloader'

function App() {
  const [pages, setPages] = useState(3); // Default value

  useEffect(() => {
    // Function to calculate the correct pages value
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

    // Calculate after initial render and when window is resized
    window.addEventListener('load', calculatePages);
    window.addEventListener('resize', calculatePages);

    // Cleanup event listeners
    return () => {
      window.removeEventListener('load', calculatePages);
      window.removeEventListener('resize', calculatePages);
    };
  }, []);

  return (
    <FontPreloader>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        dpr={[1, 2]}
      >
        <ScrollControls pages={pages} damping={0.1} distance={1}>
          <Scroll html>
            <div className="app">
              <HeaderCenter />
              <Projects />
            </div>
          </Scroll>
        </ScrollControls>
      </Canvas>
    </FontPreloader>
  )
}

export default App
