import React, { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

// Throttle particle updates: only update every N frames to save GPU bandwidth
const FRAME_SKIP = 2
let frameCounter = 0

export default function Particles({ count = 40 }) {
  const pointsRef = useRef(null)

  const [positions, speeds] = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const spd = new Float32Array(count * 3)

    for (let i = 0; i < count; i++) {
      // Room bounds: x: [-2.5, 2.5], y: [0.2, 3.0], z: [-1.2, 2.0]
      pos[i * 3 + 0] = (Math.random() - 0.5) * 5.0
      pos[i * 3 + 1] = 0.3 + Math.random() * 2.8
      pos[i * 3 + 2] = -1.0 + Math.random() * 3.2

      spd[i * 3 + 0] = (Math.random() - 0.5) * 0.03
      spd[i * 3 + 1] = 0.015 + Math.random() * 0.025
      spd[i * 3 + 2] = (Math.random() - 0.5) * 0.03
    }

    return [pos, spd]
  }, [count])

  useFrame((_, delta) => {
    frameCounter++
    // Only update particles every FRAME_SKIP frames
    if (frameCounter % FRAME_SKIP !== 0) return
    if (!pointsRef.current) return

    const posAttr = pointsRef.current.geometry.attributes.position
    const arr = posAttr.array
    const scaledDelta = delta * FRAME_SKIP // compensate for skipped frames

    for (let i = 0; i < count; i++) {
      arr[i * 3 + 1] += speeds[i * 3 + 1] * scaledDelta
      arr[i * 3 + 0] += speeds[i * 3 + 0] * scaledDelta
      arr[i * 3 + 2] += speeds[i * 3 + 2] * scaledDelta

      // Wrap vertically
      if (arr[i * 3 + 1] > 3.0) {
        arr[i * 3 + 1] = 0.3
      }
    }
    posAttr.needsUpdate = true
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        color="#c4b5fd"
        transparent
        opacity={0.28}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  )
}
