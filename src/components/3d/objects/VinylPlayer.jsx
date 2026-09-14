import React, { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import useStore from '@stores/useStore'
import { useAudio } from '@hooks/useAudio'

export default function VinylPlayer() {
  const diskRef = useRef()
  const armRef = useRef()
  const eqBar0 = useRef()
  const eqBar1 = useRef()
  const eqBar2 = useRef()
  const eqBar3 = useRef()
  const eqBar4 = useRef()
  
  const isMusicPlaying = useStore((s) => s.isMusicPlaying)
  const openModal = useStore((s) => s.openModal)
  const setHoveredObject = useStore((s) => s.setHoveredObject)
  const { playInteract, playHover } = useAudio()
  
  const [hovered, setHovered] = useState(false)

  // Animate spinning vinyl disk & bouncing equalizer bars
  useFrame((state, delta) => {
    if (diskRef.current) {
      if (isMusicPlaying) {
        diskRef.current.rotation.z -= delta * 3.0
      } else if (hovered) {
        // Slow gentle idle rotation when hovered
        diskRef.current.rotation.z -= delta * 0.8
      }
    }

    // Tonearm angle: angled onto disk when playing, swung back when stopped
    if (armRef.current) {
      const targetArmAngle = isMusicPlaying ? -0.28 : 0.15
      armRef.current.rotation.z += (targetArmAngle - armRef.current.rotation.z) * 0.1
    }

    // Equalizer LED animation
    const eqBars = [eqBar0, eqBar1, eqBar2, eqBar3, eqBar4]
    if (isMusicPlaying) {
      const time = state.clock.getElapsedTime()
      eqBars.forEach((ref, i) => {
        if (ref.current) {
          const scaleY = 0.3 + Math.abs(Math.sin(time * 6 + i * 1.3)) * 0.7
          ref.current.scale.y = scaleY
        }
      })
    } else {
      eqBars.forEach((ref) => {
        if (ref.current) {
          ref.current.scale.y = 0.15
        }
      })
    }
  })

  const handleClick = (e) => {
    e.stopPropagation()
    playInteract()
    openModal('spotify')
  }

  const handlePointerOver = (e) => {
    e.stopPropagation()
    setHovered(true)
    playHover()
    setHoveredObject('VINYL JUKEBOX — Click to Play Spotify or Custom Tracks 🎵')
    document.body.style.cursor = 'pointer'
  }

  const handlePointerOut = () => {
    setHovered(false)
    setHoveredObject(null)
    document.body.style.cursor = 'default'
  }

  return (
    <group
      position={[1.2, 2.1, -1.18]}
      onClick={handleClick}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
    >
      {/* Wall Plinth / Mounting Backboard */}
      <mesh castShadow receiveShadow position={[0, 0, 0]}>
        <boxGeometry args={[1.05, 1.35, 0.04]} />
        <meshStandardMaterial
          color={hovered ? '#1e1a38' : '#141224'}
          roughness={0.5}
          metalness={0.4}
        />
      </mesh>

      {/* Outer Sleek Acrylic/Metallic Frame */}
      <mesh position={[0, 0, 0.022]}>
        <boxGeometry args={[1.08, 1.38, 0.015]} />
        <meshStandardMaterial
          color={hovered ? '#a855f7' : '#4c1d95'}
          roughness={0.3}
          metalness={0.8}
        />
      </mesh>

      {/* Turntable Platter Deck Base (Dark brushed finish) */}
      <mesh position={[0, 0.05, 0.035]} castShadow>
        <boxGeometry args={[0.92, 0.95, 0.03]} />
        <meshStandardMaterial color="#0b0a14" roughness={0.6} metalness={0.6} />
      </mesh>

      {/* Circular Platter Rim */}
      <mesh position={[-0.08, 0.05, 0.052]}>
        <cylinderGeometry args={[0.36, 0.36, 0.015, 36]} />
        <meshStandardMaterial color="#2d2948" metalness={0.8} roughness={0.3} />
      </mesh>

      {/* SPINNING VINYL RECORD GROUP */}
      <group ref={diskRef} position={[-0.08, 0.05, 0.065]}>
        {/* Main Vinyl Disc */}
        <mesh rotation={[Math.PI / 2, 0, 0]} castShadow>
          <cylinderGeometry args={[0.34, 0.34, 0.008, 48]} />
          <meshStandardMaterial
            color="#09080e"
            roughness={0.25}
            metalness={0.7}
          />
        </mesh>

        {/* Vinyl Grooves Rings (Subtle concentric tracks) */}
        {[0.29, 0.24, 0.19].map((radius, idx) => (
          <mesh key={idx} rotation={[Math.PI / 2, 0, 0]} position={[0, 0.0045, 0]}>
            <ringGeometry args={[radius - 0.003, radius, 36]} />
            <meshBasicMaterial color="#1e1b2e" />
          </mesh>
        ))}

        {/* Central Album Art Label */}
        <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0.005, 0]}>
          <cylinderGeometry args={[0.11, 0.11, 0.009, 32]} />
          <meshStandardMaterial
            color="#7c3aed"
            roughness={0.4}
            metalness={0.2}
          />
        </mesh>

        {/* Inner Label Cyber Ring */}
        <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0.0098, 0]}>
          <ringGeometry args={[0.045, 0.065, 32]} />
          <meshBasicMaterial color="#06b6d4" />
        </mesh>

        {/* Center Spindle Hole / Metal Pin */}
        <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0.012, 0]}>
          <cylinderGeometry args={[0.018, 0.018, 0.02, 16]} />
          <meshStandardMaterial color="#e2e8f0" metalness={0.95} roughness={0.1} />
        </mesh>
      </group>

      {/* TONEARM ASSEMBLY */}
      <group position={[0.32, 0.32, 0.055]}>
        {/* Tonearm Base Pivot Column */}
        <mesh position={[0, 0, 0.01]}>
          <cylinderGeometry args={[0.032, 0.038, 0.03, 16]} />
          <meshStandardMaterial color="#475569" metalness={0.9} roughness={0.2} />
        </mesh>

        {/* Rotating Arm Pivot */}
        <group ref={armRef}>
          {/* Arm Bar */}
          <mesh position={[-0.14, -0.16, 0.025]} rotation={[0, 0, 0.78]}>
            <cylinderGeometry args={[0.006, 0.006, 0.36, 12]} />
            <meshStandardMaterial color="#cbd5e1" metalness={0.95} roughness={0.15} />
          </mesh>
          {/* Cartridge / Needle Head */}
          <mesh position={[-0.26, -0.28, 0.025]} rotation={[0, 0, 0.4]}>
            <boxGeometry args={[0.03, 0.05, 0.02]} />
            <meshStandardMaterial color="#ef4444" metalness={0.5} roughness={0.4} />
          </mesh>
        </group>
      </group>

      {/* CONTROL PANEL AREA (Bottom bar) */}
      <group position={[0, -0.52, 0.045]}>
        {/* Play / Status Indicator LED */}
        <mesh position={[-0.35, 0, 0.005]}>
          <circleGeometry args={[0.022, 16]} />
          <meshBasicMaterial color={isMusicPlaying ? '#10b981' : hovered ? '#06b6d4' : '#64748b'} />
        </mesh>

        {/* Dial Knobs */}
        <mesh position={[-0.22, 0, 0.01]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.025, 0.025, 0.015, 16]} />
          <meshStandardMaterial color="#334155" metalness={0.8} roughness={0.2} />
        </mesh>
        <mesh position={[-0.12, 0, 0.01]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.025, 0.025, 0.015, 16]} />
          <meshStandardMaterial color="#334155" metalness={0.8} roughness={0.2} />
        </mesh>

        {/* Animated Equalizer LED Bars */}
        <group position={[0.15, 0, 0.005]}>
          <mesh ref={eqBar0} position={[-0.1, 0, 0]}>
            <planeGeometry args={[0.028, 0.08]} />
            <meshBasicMaterial color={isMusicPlaying ? '#06b6d4' : '#334155'} />
          </mesh>
          <mesh ref={eqBar1} position={[-0.05, 0, 0]}>
            <planeGeometry args={[0.028, 0.08]} />
            <meshBasicMaterial color={isMusicPlaying ? '#a855f7' : '#334155'} />
          </mesh>
          <mesh ref={eqBar2} position={[0, 0, 0]}>
            <planeGeometry args={[0.028, 0.08]} />
            <meshBasicMaterial color={isMusicPlaying ? '#06b6d4' : '#334155'} />
          </mesh>
          <mesh ref={eqBar3} position={[0.05, 0, 0]}>
            <planeGeometry args={[0.028, 0.08]} />
            <meshBasicMaterial color={isMusicPlaying ? '#a855f7' : '#334155'} />
          </mesh>
          <mesh ref={eqBar4} position={[0.1, 0, 0]}>
            <planeGeometry args={[0.028, 0.08]} />
            <meshBasicMaterial color={isMusicPlaying ? '#06b6d4' : '#334155'} />
          </mesh>
        </group>

        {/* Branding Label: JUKEBOX */}
        <mesh position={[0, -0.07, 0.005]}>
          <planeGeometry args={[0.6, 0.018]} />
          <meshBasicMaterial color={hovered ? '#c084fc' : '#6b7280'} />
        </mesh>
      </group>
    </group>
  )
}
