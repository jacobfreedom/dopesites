import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.scss'
import App from './App.jsx'
import { Analytics } from '@vercel/analytics/react'
import React, { useEffect, useState, useCallback, useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import { Scroll, useScroll, View } from '@react-three/drei'

function Main() {
  return (
    <StrictMode>
      <div style={{ position: 'relative', width: '100%', height: '100vh', overflow: 'auto' }}>
          <Canvas
            dpr={[1, 1]}
            gl={{ antialias: false }}
            style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%' }}
          >
            <View.Port />
          </Canvas>
          <div style={{ position: 'absolute', top: 0, left: 0, width: '100%' }}>
            <App />
          </div>
      </div>
      <Analytics />
    </StrictMode>
  );
}

createRoot(document.getElementById('root')).render(<Main />)
