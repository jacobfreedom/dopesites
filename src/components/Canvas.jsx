import { Canvas } from '@react-three/fiber'
import { ScrollControls, Scroll, OrbitControls } from '@react-three/drei'
import { useRef } from 'react'

export default function Scene({ children }) {
  const scrollRef = useRef()

  return (
    <Canvas
      style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh' }}
      camera={{ position: [0, 0, 5], fov: 50 }}
      dpr={[1, 2]}
    >
      <color attach="background" args={['#181418']} />
      <ScrollControls pages={3} damping={0.1}>
        <Scroll html>
          <div ref={scrollRef} style={{ position: 'absolute', top: 0, left: 0, width: '100%', transformStyle: 'preserve-3d' }}>
            {children}
          </div>
        </Scroll>
      </ScrollControls>
    </Canvas>
  )
}