import React, { useState } from 'react'
import useStore from '@stores/useStore'
import { useAudio } from '@hooks/useAudio'

export default function Whiteboard() {
  const [isHovered, setIsHovered] = useState(false)
  const { setHoveredObject, openModal } = useStore()
  const { playHover, playInteract } = useAudio()

  const handleClick = (e) => {
    e.stopPropagation()
    playInteract()
    openModal('whiteboard')
  }

  return (
    <group
      position={[-2.78, 1.85, 1.1]}
      rotation={[0, Math.PI / 2, 0]}
      onClick={handleClick}
      onPointerOver={(e) => {
        e.stopPropagation()
        setIsHovered(true)
        setHoveredObject('DEV WHITEBOARD — Architecture & Tech Stack (Click to inspect)')
        playHover()
      }}
      onPointerOut={() => {
        setIsHovered(false)
        setHoveredObject(null)
      }}
    >
      {/* Aluminum Board Frame */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[1.5, 1.0, 0.03]} />
        <meshStandardMaterial
          color={isHovered ? '#3b2d5a' : '#1e1a2c'}
          roughness={0.4}
          metalness={0.8}
        />
      </mesh>

      {/* Glossy Whiteboard Surface (Dark Mode Tech Board) */}
      <mesh position={[0, 0, 0.016]}>
        <planeGeometry args={[1.42, 0.92]} />
        <meshStandardMaterial
          color="#161224"
          roughness={0.2}
          metalness={0.1}
        />
      </mesh>

      {/* Header bar representation */}
      <mesh position={[0, 0.38, 0.018]}>
        <planeGeometry args={[1.3, 0.04]} />
        <meshBasicMaterial color="#a855f7" />
      </mesh>

      {/* Sticky note 1: "SPRINT GOALS" (Yellow) */}
      <mesh position={[-0.45, 0.18, 0.019]}>
        <planeGeometry args={[0.22, 0.22]} />
        <meshStandardMaterial color="#fde047" roughness={0.8} />
      </mesh>

      {/* Sticky note 2: "SHADERS & VFX" (Purple) */}
      <mesh position={[-0.15, 0.18, 0.019]}>
        <planeGeometry args={[0.22, 0.22]} />
        <meshStandardMaterial color="#c084fc" roughness={0.8} />
      </mesh>

      {/* Sticky note 3: "PHYSICS & ECS" (Cyan) */}
      <mesh position={[0.15, 0.18, 0.019]}>
        <planeGeometry args={[0.22, 0.22]} />
        <meshStandardMaterial color="#38bdf8" roughness={0.8} />
      </mesh>

      {/* Sticky note 4: "AUDIO & SFX" (Green) */}
      <mesh position={[0.45, 0.18, 0.019]}>
        <planeGeometry args={[0.22, 0.22]} />
        <meshStandardMaterial color="#4ade80" roughness={0.8} />
      </mesh>

      {/* Architecture diagram boxes & lines */}
      <mesh position={[-0.3, -0.16, 0.019]}>
        <planeGeometry args={[0.35, 0.18]} />
        <meshStandardMaterial color="#1e1832" />
      </mesh>
      <mesh position={[0.3, -0.16, 0.019]}>
        <planeGeometry args={[0.35, 0.18]} />
        <meshStandardMaterial color="#1e1832" />
      </mesh>
      {/* Connecting wireframe vector arrow */}
      <mesh position={[0, -0.16, 0.02]}>
        <planeGeometry args={[0.2, 0.01]} />
        <meshBasicMaterial color="#818cf8" />
      </mesh>

      {/* Marker Tray at bottom of whiteboard */}
      <mesh position={[0, -0.49, 0.03]} castShadow>
        <boxGeometry args={[1.3, 0.02, 0.05]} />
        <meshStandardMaterial color="#2d2842" roughness={0.5} metalness={0.7} />
      </mesh>

      {/* Colored dry erase markers */}
      <mesh position={[-0.1, -0.475, 0.03]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.006, 0.006, 0.09, 8]} />
        <meshBasicMaterial color="#ef4444" />
      </mesh>
      <mesh position={[0, -0.475, 0.03]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.006, 0.006, 0.09, 8]} />
        <meshBasicMaterial color="#3b82f6" />
      </mesh>
      <mesh position={[0.1, -0.475, 0.03]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.006, 0.006, 0.09, 8]} />
        <meshBasicMaterial color="#a855f7" />
      </mesh>

      {/* Glow spotlight over whiteboard */}
      <pointLight
        position={[0, 0.2, 0.4]}
        color="#c084fc"
        intensity={isHovered ? 1.4 : 0.7}
        distance={2.0}
      />
    </group>
  )
}
