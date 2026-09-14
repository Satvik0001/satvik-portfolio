import React, { useState } from 'react'
import useStore from '@stores/useStore'
import { useAudio } from '@hooks/useAudio'
import { achievements } from '@data/achievements'

export default function TrophyShelf() {
  const [isHovered, setIsHovered] = useState(false)
  const { openModal, setHoveredObject } = useStore()
  const { playHover, playInteract } = useAudio()

  const handleTrophyClick = (e, ach) => {
    e.stopPropagation()
    playInteract()
    openModal('achievement', ach || achievements[0])
  }

  return (
    <group
      position={[0, 1.95, -0.6]}
      onPointerOver={(e) => {
        e.stopPropagation()
        setIsHovered(true)
        setHoveredObject('TROPHY SHELF — Click to view Achievements')
        playHover()
      }}
      onPointerOut={() => {
        setIsHovered(false)
        setHoveredObject(null)
      }}
    >
      {/* Floating Wall Shelf Board (Matte dark composite) */}
      <mesh position={[0, 0, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.5, 0.035, 0.26]} />
        <meshStandardMaterial
          color={isHovered ? '#261b3d' : '#14121d'}
          roughness={0.6}
        />
      </mesh>

      {/* Modern angled wall mounting brackets */}
      <mesh position={[-0.55, -0.06, -0.08]} castShadow>
        <boxGeometry args={[0.02, 0.12, 0.18]} />
        <meshStandardMaterial color="#1e1e2c" metalness={0.8} roughness={0.3} />
      </mesh>
      <mesh position={[0.55, -0.06, -0.08]} castShadow>
        <boxGeometry args={[0.02, 0.12, 0.18]} />
        <meshStandardMaterial color="#1e1e2c" metalness={0.8} roughness={0.3} />
      </mesh>

      {/* Undershelf warm-purple LED glow */}
      <mesh position={[0, -0.02, 0.1]}>
        <boxGeometry args={[1.4, 0.005, 0.005]} />
        <meshBasicMaterial color="#c084fc" />
      </mesh>
      <pointLight
        position={[0, -0.08, 0.12]}
        color="#8b5cf6"
        intensity={isHovered ? 0.9 : 0.45}
        distance={1.2}
      />

      {/* --- TROPHY 1: GOLD CUP (Center) --- */}
      <group
        position={[0, 0.018, 0]}
        onClick={(e) => handleTrophyClick(e, achievements[0])}
      >
        {/* Base pedestal (marble/black acrylic) */}
        <mesh position={[0, 0.025, 0]} castShadow>
          <boxGeometry args={[0.1, 0.05, 0.1]} />
          <meshStandardMaterial color="#0e0d14" roughness={0.2} metalness={0.5} />
        </mesh>
        {/* Gold Plaque on base */}
        <mesh position={[0, 0.025, 0.051]}>
          <planeGeometry args={[0.08, 0.03]} />
          <meshStandardMaterial color="#ffd700" metalness={0.9} roughness={0.2} />
        </mesh>
        {/* Stem */}
        <mesh position={[0, 0.08, 0]} castShadow>
          <cylinderGeometry args={[0.015, 0.025, 0.07, 16]} />
          <meshStandardMaterial color="#ffc72c" metalness={0.85} roughness={0.25} />
        </mesh>
        {/* Cup body */}
        <mesh position={[0, 0.15, 0]} castShadow>
          <cylinderGeometry args={[0.05, 0.02, 0.09, 16]} />
          <meshStandardMaterial color="#ffd700" metalness={0.9} roughness={0.2} />
        </mesh>
        {/* Handles */}
        <mesh position={[-0.05, 0.15, 0]}>
          <torusGeometry args={[0.025, 0.005, 8, 16]} rotation={[0, Math.PI / 2, 0]} />
          <meshStandardMaterial color="#ffd700" metalness={0.9} roughness={0.2} />
        </mesh>
        <mesh position={[0.05, 0.15, 0]}>
          <torusGeometry args={[0.025, 0.005, 8, 16]} rotation={[0, Math.PI / 2, 0]} />
          <meshStandardMaterial color="#ffd700" metalness={0.9} roughness={0.2} />
        </mesh>
      </group>

      {/* --- TROPHY 2: GLASS / ACRYLIC STAR AWARD (Left) --- */}
      <group
        position={[-0.38, 0.018, 0]}
        onClick={(e) => handleTrophyClick(e, achievements[1])}
      >
        {/* Base */}
        <mesh position={[0, 0.02, 0]} castShadow>
          <cylinderGeometry args={[0.05, 0.055, 0.04, 16]} />
          <meshStandardMaterial color="#1a1826" roughness={0.3} metalness={0.7} />
        </mesh>
        {/* Crystal Star Spire */}
        <mesh position={[0, 0.12, 0]} castShadow>
          <octahedronGeometry args={[0.075, 0]} />
          <meshPhysicalMaterial
            color="#a78bfa"
            roughness={0.1}
            metalness={0.1}
            transmission={0.8}
            transparent
            opacity={0.8}
          />
        </mesh>
      </group>

      {/* --- TROPHY 3: FRAMED CERTIFICATE / BADGE (Right) --- */}
      <group
        position={[0.38, 0.018, 0]}
        rotation={[0, -0.2, 0]}
        onClick={(e) => handleTrophyClick(e, achievements[0])}
      >
        {/* Frame stand */}
        <mesh position={[0, 0.1, 0]} rotation={[-0.15, 0, 0]} castShadow>
          <boxGeometry args={[0.18, 0.22, 0.015]} />
          <meshStandardMaterial color="#2a2040" roughness={0.5} metalness={0.4} />
        </mesh>
        {/* Certificate face */}
        <mesh position={[0, 0.1, 0.009]} rotation={[-0.15, 0, 0]}>
          <planeGeometry args={[0.15, 0.19]} />
          <meshStandardMaterial color="#eee8f8" roughness={0.8} />
        </mesh>
        {/* Ribbon / Seal */}
        <mesh position={[0, 0.05, 0.012]} rotation={[-0.15, 0, 0]}>
          <circleGeometry args={[0.02, 16]} />
          <meshBasicMaterial color="#7c3aed" />
        </mesh>
      </group>
    </group>
  )
}
