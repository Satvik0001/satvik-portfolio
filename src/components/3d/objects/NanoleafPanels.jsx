import React, { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export default function NanoleafPanels() {
  const panelMatsRef = useRef([])

  // Animated RGB glow sequence
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() * 1.2
    panelMatsRef.current.forEach((mat, idx) => {
      if (!mat) return
      const hue = (0.72 + Math.sin(t + idx * 0.8) * 0.12) % 1.0 // purple -> violet -> magenta
      mat.color.setHSL(hue, 0.9, 0.65)
    })
  })

  // 5 Hexagonal panels arranged in a modern geometric pattern on back wall (right side accent)
  const panelCoords = [
    { x: 2.05, y: 2.3, z: -1.18 },
    { x: 2.23, y: 2.45, z: -1.18 },
    { x: 2.23, y: 2.15, z: -1.18 },
    { x: 2.41, y: 2.3, z: -1.18 },
    { x: 2.41, y: 2.6, z: -1.18 },
  ]

  return (
    <group>
      {panelCoords.map((p, idx) => (
        <group key={idx} position={[p.x, p.y, p.z]}>
          {/* Panel Base Housing */}
          <mesh rotation={[0, 0, Math.PI / 6]}>
            <cylinderGeometry args={[0.11, 0.11, 0.015, 6]} />
            <meshStandardMaterial color="#1a1826" roughness={0.5} />
          </mesh>
          {/* Glowing Front Face */}
          <mesh position={[0, 0, 0.009]} rotation={[Math.PI / 2, 0, Math.PI / 6]}>
            <circleGeometry args={[0.095, 6]} />
            <meshBasicMaterial
              ref={(el) => {
                if (el) panelMatsRef.current[idx] = el
              }}
              color="#a855f7"
            />
          </mesh>
        </group>
      ))}

      {/* Ambient soft glow light cast onto back wall */}
      <pointLight position={[1.3, 2.35, -1.0]} color="#a855f7" intensity={1.1} distance={1.8} />
    </group>
  )
}
