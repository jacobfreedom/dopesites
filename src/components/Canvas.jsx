import { Canvas } from '@react-three/fiber'
import { ScrollControls, Scroll } from '@react-three/drei'
import { useRef, Suspense } from 'react'

export default function Scene({ children }) {
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
            {children}
          </Scroll>
        </ScrollControls>
      </Suspense>
    </Canvas>
  )
}