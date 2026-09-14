import React, { useState } from 'react'
import useStore from '@stores/useStore'
import { useAudio } from '@hooks/useAudio'

export default function DeskAccessories() {
  const [bgmActive, setBgmActive] = useState(false)
  const { setHoveredObject, openModal } = useStore()
  const { playHover, playInteract, toggleBgm } = useAudio()

  const handleSpeakerClick = (e) => {
    e.stopPropagation()
    playInteract()
    const active = toggleBgm()
    setBgmActive(active)
    setHoveredObject(active ? 'CYBER RADIO — ♪ BGM ON (Procedural Synthwave)' : 'CYBER RADIO — Click to Play Chill Game Music')
  }

  const handleStickyNoteClick = (e) => {
    e.stopPropagation()
    playInteract()
    openModal('notes')
  }

  return (
    <group position={[0, 0.9, 0]}>
      {/* ========================================================= */}
      {/* 1. DEVELOPER COFFEE MUG (Right of keyboard) */}
      {/* ========================================================= */}
      <group
        position={[0.55, 0.05, 0.15]}
        onPointerOver={(e) => {
          e.stopPropagation()
          setHoveredObject('COFFEE MUG — Fuel for Game Developers')
          playHover()
        }}
        onPointerOut={() => setHoveredObject(null)}
      >
        {/* Mug Body */}
        <mesh castShadow>
          <cylinderGeometry args={[0.04, 0.038, 0.09, 20]} />
          <meshStandardMaterial color="#1f1a2e" roughness={0.4} />
        </mesh>
        {/* Coffee Liquid inside */}
        <mesh position={[0, 0.038, 0]}>
          <cylinderGeometry args={[0.036, 0.036, 0.005, 16]} />
          <meshStandardMaterial color="#2d1c12" roughness={0.2} />
        </mesh>
        {/* Purple accent ring on rim */}
        <mesh position={[0, 0.046, 0]}>
          <torusGeometry args={[0.04, 0.0025, 8, 20]} rotation={[Math.PI / 2, 0, 0]} />
          <meshBasicMaterial color="#a855f7" />
        </mesh>
        {/* Handle */}
        <mesh position={[0.042, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <torusGeometry args={[0.024, 0.006, 8, 16, Math.PI]} />
          <meshStandardMaterial color="#1f1a2e" roughness={0.4} />
        </mesh>
      </group>

      {/* ========================================================= */}
      {/* 2. WIRELESS GAME CONTROLLER (Left of keyboard) */}
      {/* ========================================================= */}
      <group
        position={[-0.52, 0.02, 0.22]}
        rotation={[-0.05, 0.25, 0]}
        onPointerOver={(e) => {
          e.stopPropagation()
          setHoveredObject('PRO WIRELESS GAMEPAD — Built for Action Games')
          playHover()
        }}
        onPointerOut={() => setHoveredObject(null)}
      >
        {/* Controller Body Shell */}
        <mesh castShadow>
          <boxGeometry args={[0.18, 0.028, 0.11]} />
          <meshStandardMaterial color="#15121e" roughness={0.5} metalness={0.4} />
        </mesh>
        {/* Left Grip */}
        <mesh position={[-0.08, -0.01, 0.03]} rotation={[0.2, 0.3, 0]}>
          <cylinderGeometry args={[0.025, 0.02, 0.08, 12]} />
          <meshStandardMaterial color="#120f1a" roughness={0.6} />
        </mesh>
        {/* Right Grip */}
        <mesh position={[0.08, -0.01, 0.03]} rotation={[0.2, -0.3, 0]}>
          <cylinderGeometry args={[0.025, 0.02, 0.08, 12]} />
          <meshStandardMaterial color="#120f1a" roughness={0.6} />
        </mesh>
        {/* Thumbsticks */}
        <mesh position={[-0.04, 0.02, 0.01]}>
          <cylinderGeometry args={[0.014, 0.014, 0.012, 12]} />
          <meshStandardMaterial color="#2d2244" />
        </mesh>
        <mesh position={[0.02, 0.02, 0.02]}>
          <cylinderGeometry args={[0.014, 0.014, 0.012, 12]} />
          <meshStandardMaterial color="#2d2244" />
        </mesh>
        {/* ABXY Action Buttons */}
        <mesh position={[0.06, 0.018, -0.02]}>
          <cylinderGeometry args={[0.006, 0.006, 0.008, 8]} />
          <meshBasicMaterial color="#a855f7" />
        </mesh>
        {/* Glowing Home / Guide Button */}
        <mesh position={[0, 0.016, -0.025]}>
          <circleGeometry args={[0.008, 12]} rotation={[-Math.PI / 2, 0, 0]} />
          <meshBasicMaterial color="#38bdf8" />
        </mesh>
      </group>

      {/* ========================================================= */}
      {/* 3. CYBER RADIO / AMBIENT LOFI SYNTH SPEAKER */}
      {/* ========================================================= */}
      <group
        position={[0.78, 0.06, -0.12]}
        rotation={[0, -0.25, 0]}
        onClick={handleSpeakerClick}
        onPointerOver={(e) => {
          e.stopPropagation()
          setHoveredObject(bgmActive ? 'CYBER RADIO — ♪ BGM ON (Click to Mute)' : 'CYBER RADIO — Click to Play Chill Game Music')
          playHover()
        }}
        onPointerOut={() => setHoveredObject(null)}
      >
        {/* Speaker Cabinet */}
        <mesh castShadow>
          <boxGeometry args={[0.16, 0.12, 0.1]} />
          <meshStandardMaterial color="#171324" roughness={0.4} metalness={0.6} />
        </mesh>
        {/* Speaker Driver Cone */}
        <mesh position={[0, 0, 0.051]}>
          <circleGeometry args={[0.042, 20]} />
          <meshStandardMaterial color="#241b38" roughness={0.8} />
        </mesh>
        {/* Driver Center Dome */}
        <mesh position={[0, 0, 0.055]}>
          <sphereGeometry args={[0.016, 12, 12]} />
          <meshBasicMaterial color={bgmActive ? '#c084fc' : '#7c3aed'} />
        </mesh>
        {/* LED EQ status ring */}
        <mesh position={[0, 0, 0.052]}>
          <ringGeometry args={[0.044, 0.048, 20]} />
          <meshBasicMaterial color={bgmActive ? '#4ade80' : '#818cf8'} />
        </mesh>

        {/* Ambient indicator glow */}
        {bgmActive && (
          <pointLight position={[0, 0.05, 0.1]} color="#c084fc" intensity={0.9} distance={0.8} />
        )}
      </group>

      {/* ========================================================= */}
      {/* 4. DEV STICKY NOTES WITH EASTER EGGS */}
      {/* ========================================================= */}
      <group
        position={[-0.45, 0.01, -0.25]}
        rotation={[0, 0.1, 0]}
        onClick={handleStickyNoteClick}
        onPointerOver={(e) => {
          e.stopPropagation()
          setHoveredObject('STICKY NOTE — Game Dev Notes & Easter Eggs (Click to Read)')
          playHover()
        }}
        onPointerOut={() => setHoveredObject(null)}
      >
        {/* Sticky pad paper */}
        <mesh castShadow>
          <boxGeometry args={[0.1, 0.005, 0.1]} />
          <meshStandardMaterial color="#fef08a" roughness={0.9} />
        </mesh>
        {/* Scribbled text lines representation */}
        <mesh position={[0, 0.003, -0.02]}>
          <planeGeometry args={[0.07, 0.006]} rotation={[-Math.PI / 2, 0, 0]} />
          <meshBasicMaterial color="#713f12" />
        </mesh>
        <mesh position={[0, 0.003, 0]}>
          <planeGeometry args={[0.07, 0.006]} rotation={[-Math.PI / 2, 0, 0]} />
          <meshBasicMaterial color="#713f12" />
        </mesh>
        <mesh position={[-0.015, 0.003, 0.02]}>
          <planeGeometry args={[0.04, 0.006]} rotation={[-Math.PI / 2, 0, 0]} />
          <meshBasicMaterial color="#a21caf" />
        </mesh>
      </group>
    </group>
  )
}
