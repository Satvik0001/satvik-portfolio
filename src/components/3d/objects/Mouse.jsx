import React, { useState } from 'react'
import useStore from '@stores/useStore'

export default function Mouse() {
  const [isHovered, setIsHovered] = useState(false)
  const { setHoveredObject } = useStore()

  return (
    <group
      position={[0.28, 0.915, 0.18]}
      rotation={[0, -0.08, 0]}
      onPointerOver={(e) => {
        e.stopPropagation()
        setIsHovered(true)
        setHoveredObject('GAMING MOUSE')
      }}
      onPointerOut={() => {
        setIsHovered(false)
        setHoveredObject(null)
      }}
    >
      {/* Ergonomic Mouse Body */}
      <mesh position={[0, 0.016, 0]} castShadow>
        <boxGeometry args={[0.075, 0.032, 0.125]} />
        <meshStandardMaterial
          color={isHovered ? '#221a36' : '#14131c'}
          roughness={0.5}
          metalness={0.3}
        />
      </mesh>

      {/* Palm slope rear */}
      <mesh position={[0, 0.024, 0.02]} rotation={[-0.2, 0, 0]} castShadow>
        <boxGeometry args={[0.072, 0.02, 0.07]} />
        <meshStandardMaterial color="#171622" roughness={0.4} metalness={0.4} />
      </mesh>

      {/* Scroll wheel */}
      <mesh position={[0, 0.033, -0.03]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.008, 0.008, 0.006, 16]} />
        <meshStandardMaterial color="#302a45" roughness={0.3} />
      </mesh>

      {/* Illuminated RGB Scroll Wheel Ring */}
      <mesh position={[0, 0.033, -0.03]}>
        <torusGeometry args={[0.0085, 0.0015, 8, 16]} />
        <meshBasicMaterial color="#8b5cf6" />
      </mesh>

      {/* Subtle underglow */}
      <pointLight
        position={[0, 0.005, 0.02]}
        color="#7c3aed"
        intensity={isHovered ? 0.35 : 0.15}
        distance={0.2}
      />
    </group>
  )
}
