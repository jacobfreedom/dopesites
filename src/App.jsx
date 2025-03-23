import React from 'react'
import './App.scss'
import { Canvas } from '@react-three/fiber'
import { ScrollControls, Scroll } from '@react-three/drei'
import Projects from './components/Projects'
import HeaderCenter from './components/HeaderCenter'

function App() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 50 }}
    >
      <ScrollControls pages={3} damping={0.1} distance={1} >
        <Scroll html>
          <div className="app">
            <HeaderCenter />
            <Projects />
          </div>
        </Scroll>
      </ScrollControls>
    </Canvas>
  )
}

export default App
