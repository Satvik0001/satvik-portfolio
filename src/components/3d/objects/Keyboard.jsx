import React, { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export default function Keyboard() {
  const rgbLightRef = useRef(null)

  // Gentle wave cycling for keyboard RGB
  useFrame(({ clock }) => {
    if (rgbLightRef.current) {
      const t = clock.getElapsedTime() * 1.5
      // Wave between purple (#7c3aed) and electric indigo (#4f46e5)
      const r = 0.45 + Math.sin(t) * 0.15
      const g = 0.2 + Math.sin(t + 1.0) * 0.1
      const b = 0.95
      rgbLightRef.current.color.setRGB(r, g, b)
    }
  })

  return (
    <group position={[-0.15, 0.915, 0.18]} rotation={[0.04, 0, 0]}>
      {/* Keyboard Beveled Chassis */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[0.44, 0.018, 0.15]} />
        <meshStandardMaterial color="#121118" roughness={0.6} metalness={0.5} />
      </mesh>

      {/* Top Aluminum Plate */}
      <mesh position={[0, 0.01, 0]}>
        <boxGeometry args={[0.42, 0.004, 0.135]} />
        <meshStandardMaterial color="#1f1d2b" roughness={0.3} metalness={0.8} />
      </mesh>

      {/* Keycaps cluster (procedural rows) */}
      <group position={[0, 0.016, 0]}>
        {[-0.045, -0.022, 0.001, 0.024, 0.047].map((rowZ, rowIdx) => (
          <mesh key={rowIdx} position={[0, 0, rowZ]}>
            <boxGeometry args={[0.39, 0.008, 0.018]} />
            <meshStandardMaterial
              color="#2a2838"
              roughness={0.5}
              metalness={0.2}
            />
          </mesh>
        ))}

        {/* Spacebar accent cap (purple) */}
        <mesh position={[0, 0.002, 0.047]}>
          <boxGeometry args={[0.12, 0.009, 0.018]} />
          <meshStandardMaterial color="#7c3aed" roughness={0.4} metalness={0.3} />
        </mesh>

        {/* Escape key accent (neon purple) */}
        <mesh position={[-0.18, 0.002, -0.045]}>
          <boxGeometry args={[0.022, 0.009, 0.018]} />
          <meshStandardMaterial color="#9333ea" roughness={0.3} metalness={0.4} />
        </mesh>
      </group>

      {/* Dynamic Sub-key RGB Underglow */}
      <pointLight
        ref={rgbLightRef}
        position={[0, 0.02, 0]}
        intensity={0.4}
        distance={0.35}
        color="#7c3aed"
      />
    </group>
  )
}
