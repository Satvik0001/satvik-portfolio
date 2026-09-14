import React, { useState } from 'react'
import useStore from '@stores/useStore'
import { useAudio } from '@hooks/useAudio'
import { COLORS } from '@styles/theme'

export default function Bookshelf() {
  const [isHovered, setIsHovered] = useState(false)
  const { openModal, setHoveredObject } = useStore()
  const { playHover, playInteract } = useAudio()

  const handleClick = (e) => {
    e.stopPropagation()
    playInteract()
    openModal('about')
  }

  return (
    <group
      position={[-2.3, 1.2, -0.2]}
      rotation={[0, Math.PI / 2, 0]}
      onClick={handleClick}
      onPointerOver={(e) => {
        e.stopPropagation()
        setIsHovered(true)
        setHoveredObject('BOOKSHELF — Click to explore About & Skills')
        playHover()
      }}
      onPointerOut={() => {
        setIsHovered(false)
        setHoveredObject(null)
      }}
    >
      {/* Bookshelf Frame (Matte dark wood) */}
      {/* Top shelf */}
      <mesh position={[0, 0.5, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.2, 0.03, 0.3]} />
        <meshStandardMaterial
          color={isHovered ? '#261b3b' : '#14121d'}
          roughness={0.7}
        />
      </mesh>
      {/* Middle shelf */}
      <mesh position={[0, 0, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.2, 0.03, 0.3]} />
        <meshStandardMaterial
          color={isHovered ? '#261b3b' : '#14121d'}
          roughness={0.7}
        />
      </mesh>
      {/* Bottom shelf */}
      <mesh position={[0, -0.5, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.2, 0.03, 0.3]} />
        <meshStandardMaterial
          color={isHovered ? '#261b3b' : '#14121d'}
          roughness={0.7}
        />
      </mesh>
      {/* Left upright */}
      <mesh position={[-0.585, 0, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.03, 1.03, 0.3]} />
        <meshStandardMaterial color="#14121d" roughness={0.7} />
      </mesh>
      {/* Right upright */}
      <mesh position={[0.585, 0, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.03, 1.03, 0.3]} />
        <meshStandardMaterial color="#14121d" roughness={0.7} />
      </mesh>

      {/* --- TOP SHELF BOOKS & ITEMS --- */}
      <group position={[-0.45, 0.515, 0]}>
        {/* Row of C# / Game Dev books */}
        {COLORS.three.bookColors.map((color, idx) => (
          <mesh key={idx} position={[idx * 0.05, 0.12, 0]} castShadow>
            <boxGeometry args={[0.042, 0.22 + (idx % 3) * 0.03, 0.2]} />
            <meshStandardMaterial color={color} roughness={0.6} />
          </mesh>
        ))}

        {/* Small decorative crystal/polyhedron on right */}
        <mesh position={[0.65, 0.08, 0]} rotation={[0.4, 0.5, 0.2]} castShadow>
          <octahedronGeometry args={[0.065]} />
          <meshStandardMaterial
            color="#a78bfa"
            roughness={0.2}
            metalness={0.6}
          />
        </mesh>
      </group>

      {/* --- MIDDLE SHELF: GAME ARCHITECTURE BOOKS & MINI FIGURINE --- */}
      <group position={[-0.35, 0.015, 0]}>
        {/* Books leaning */}
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <mesh
            key={i}
            position={[i * 0.045, 0.11, 0]}
            rotation={[0, 0, i === 5 ? -0.22 : 0]}
            castShadow
          >
            <boxGeometry args={[0.038, 0.2, 0.19]} />
            <meshStandardMaterial
              color={i % 2 === 0 ? '#4c1d95' : '#1e1b4b'}
              roughness={0.6}
            />
          </mesh>
        ))}

        {/* Little Robot / Game Character figurine */}
        <group position={[0.55, 0.08, 0]}>
          {/* Figurine body */}
          <mesh castShadow>
            <boxGeometry args={[0.06, 0.08, 0.06]} />
            <meshStandardMaterial color="#7c3aed" roughness={0.4} metalness={0.3} />
          </mesh>
          {/* Figurine head */}
          <mesh position={[0, 0.065, 0]} castShadow>
            <sphereGeometry args={[0.032, 12, 12]} />
            <meshStandardMaterial color="#c084fc" roughness={0.3} />
          </mesh>
        </group>
      </group>

      {/* --- BOTTOM SHELF BINDERS & GAME CASES --- */}
      <group position={[-0.45, -0.485, 0]}>
        {[0, 1, 2, 3, 4, 5, 6, 7].map((idx) => (
          <mesh key={idx} position={[idx * 0.04, 0.11, 0]} castShadow>
            <boxGeometry args={[0.032, 0.2, 0.17]} />
            <meshStandardMaterial
              color={idx === 3 ? '#9333ea' : '#1f1d2b'}
              roughness={0.5}
            />
          </mesh>
        ))}
      </group>

      {/* Under-shelf ambient purple LED glow strip */}
      <mesh position={[0, 0.48, 0.12]}>
        <boxGeometry args={[1.15, 0.008, 0.008]} />
        <meshBasicMaterial color="#a78bfa" />
      </mesh>
      <pointLight
        position={[0, 0.4, 0.1]}
        color="#8b5cf6"
        intensity={isHovered ? 0.8 : 0.4}
        distance={1.0}
      />
    </group>
  )
}
