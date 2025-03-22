import React, { Suspense } from 'react'
import './App.scss'
import { Canvas } from '@react-three/fiber'
import { ScrollControls, Scroll } from '@react-three/drei'
import Projects from './components/Projects'
import Header from './components/Header'
import Center from './components/Center'
import Description from './components/Description'

function App() {
  return (
    <Canvas
      style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh' }}
      camera={{ position: [0, 0, 5], fov: 50 }}
      frameloop="demand"
    >
      <color attach="background" args={['#181418']} />
      <Suspense fallback={null}>
        <ScrollControls pages={3} damping={0.1} distance={1}>
          <Scroll html>
            <div className="app">
              <Header />
              <Center />
              <Description />
              <Projects />
            </div>
          </Scroll>
        </ScrollControls>
      </Suspense>
    </Canvas>
  )
}

export default App
