import React, { useRef, useEffect } from 'react'
import { useThree } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import useStore from '@stores/useStore'

export default function CameraController() {
  const controlsRef = useRef(null)
  const { chairRotating } = useStore()
  const { camera } = useThree()

  useEffect(() => {
    camera.position.set(0, 1.75, 2.6)
    camera.lookAt(0, 1.1, 0)
  }, [camera])

  return (
    <OrbitControls
      ref={controlsRef}
      target={[0, 1.1, 0.1]}
      enabled={!chairRotating}
      enableDamping
      dampingFactor={0.04}   // softer, more cinematic follow-through
      // Limit zoom to stay inside the room
      minDistance={1.2}
      maxDistance={3.8}
      // Limit vertical angle (no floor or ceiling flipping)
      minPolarAngle={Math.PI / 6}
      maxPolarAngle={Math.PI / 2 - 0.05}
      // Limit horizontal sweep — stays focused on workspace
      minAzimuthAngle={-Math.PI / 2.6}
      maxAzimuthAngle={Math.PI / 2.6}
      enablePan={false}
      rotateSpeed={0.55}     // slightly slower = feels more deliberate and smooth
    />
  )
}
