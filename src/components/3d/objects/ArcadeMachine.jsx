import React, { useRef, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import * as THREE from 'three'
import useStore from '@stores/useStore'
import { useAudio } from '@hooks/useAudio'

export default function ArcadeMachine() {
  const navigate = useNavigate()
  const [isHovered, setIsHovered] = useState(false)
  const screenTexRef = useRef(null)
  const { setHoveredObject } = useStore()
  const { playHover, playInteract } = useAudio()

  useEffect(() => {
    // Generate animated Attract-mode canvas for arcade screen
    const canvas = document.createElement('canvas')
    canvas.width = 256
    canvas.height = 256
    const ctx = canvas.getContext('2d')

    const texture = new THREE.CanvasTexture(canvas)
    texture.colorSpace = THREE.SRGBColorSpace
    screenTexRef.current = texture

    let frame = 0
    let animId = null

    const draw = () => {
      frame++
      // Screen background
      ctx.fillStyle = '#05030a'
      ctx.fillRect(0, 0, 256, 256)

      // CRT Scanlines
      ctx.fillStyle = 'rgba(0, 0, 0, 0.25)'
      for (let y = 0; y < 256; y += 4) {
        ctx.fillRect(0, y, 256, 2)
      }

      // Title Banner
      ctx.fillStyle = '#facc15'
      ctx.font = 'bold 18px monospace'
      ctx.textAlign = 'center'
      ctx.fillText('PAC-MAN', 128, 40)

      ctx.fillStyle = '#a78bfa'
      ctx.font = '10px monospace'
      ctx.fillText('SATVIK EDITION', 128, 60)

      // Animated Pac-man chasing ghost
      const px = (frame * 2) % 290 - 20
      const mouthAngle = (Math.sin(frame * 0.2) + 1) * 0.25

      // Pac-Man
      ctx.fillStyle = '#fbbf24'
      ctx.beginPath()
      ctx.arc(px, 120, 16, mouthAngle, Math.PI * 2 - mouthAngle)
      ctx.lineTo(px, 120)
      ctx.fill()

      // Red Ghost
      const gx = px + 45
      ctx.fillStyle = '#ef4444'
      ctx.beginPath()
      ctx.arc(gx, 116, 14, Math.PI, 0, false)
      ctx.lineTo(gx + 14, 132)
      ctx.lineTo(gx - 14, 132)
      ctx.fill()

      // Ghost eyes
      ctx.fillStyle = '#ffffff'
      ctx.beginPath()
      ctx.arc(gx - 4, 114, 4, 0, Math.PI * 2)
      ctx.arc(gx + 4, 114, 4, 0, Math.PI * 2)
      ctx.fill()

      // Blinking "INSERT COIN" / "PRESS TO PLAY"
      if (Math.floor(frame / 25) % 2 === 0) {
        ctx.fillStyle = '#4ade80'
        ctx.font = 'bold 12px monospace'
        ctx.fillText('► CLICK TO PLAY ◄', 128, 185)
      } else {
        ctx.fillStyle = '#c084fc'
        ctx.font = '11px monospace'
        ctx.fillText('PROJECTS & EXP', 128, 185)
      }

      ctx.fillStyle = '#94a3b8'
      ctx.font = '9px monospace'
      ctx.fillText('HIGH SCORE: 99990', 128, 230)

      // Only upload texture to GPU every 3rd frame (~20fps) for smooth performance
      if (frame % 3 === 0) {
        texture.needsUpdate = true
      }
      animId = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      if (animId) cancelAnimationFrame(animId)
      texture.dispose()
    }
  }, [])

  const handleClick = (e) => {
    e.stopPropagation()
    playInteract()
    navigate('/arcade')
  }

  return (
    <group
      position={[2.2, 0, 0.4]}
      rotation={[0, -Math.PI / 2.3, 0]}
      onClick={handleClick}
      onPointerOver={(e) => {
        e.stopPropagation()
        setIsHovered(true)
        setHoveredObject('PAC-MAN ARCADE — Click to Play & View Projects')
        playHover()
      }}
      onPointerOut={() => {
        setIsHovered(false)
        setHoveredObject(null)
      }}
    >
      {/* --- CABINET BODY (Matte Black / Charcoal with purple bevels) --- */}
      {/* Lower base pedestal */}
      <mesh position={[0, 0.45, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.7, 0.9, 0.75]} />
        <meshStandardMaterial
          color={isHovered ? '#201833' : '#121118'}
          roughness={0.7}
        />
      </mesh>

      {/* Coin Door on lower base */}
      <mesh position={[0, 0.45, 0.376]}>
        <boxGeometry args={[0.3, 0.4, 0.005]} />
        <meshStandardMaterial color="#1a1824" roughness={0.4} metalness={0.8} />
      </mesh>
      {/* Coin insert slots (orange glowing inserts) */}
      <mesh position={[-0.06, 0.52, 0.381]}>
        <boxGeometry args={[0.04, 0.06, 0.002]} />
        <meshBasicMaterial color="#f97316" />
      </mesh>
      <mesh position={[0.06, 0.52, 0.381]}>
        <boxGeometry args={[0.04, 0.06, 0.002]} />
        <meshBasicMaterial color="#f97316" />
      </mesh>

      {/* Upper angled cabinet side wings */}
      <mesh position={[-0.34, 1.25, -0.05]} castShadow>
        <boxGeometry args={[0.04, 0.95, 0.78]} />
        <meshStandardMaterial color="#171520" roughness={0.6} />
      </mesh>
      <mesh position={[0.34, 1.25, -0.05]} castShadow>
        <boxGeometry args={[0.04, 0.95, 0.78]} />
        <meshStandardMaterial color="#171520" roughness={0.6} />
      </mesh>

      {/* Purple Cabinet T-Molding Trim along edges */}
      <mesh position={[-0.355, 1.25, 0.28]}>
        <boxGeometry args={[0.015, 0.95, 0.03]} />
        <meshStandardMaterial color="#8b5cf6" roughness={0.4} />
      </mesh>
      <mesh position={[0.355, 1.25, 0.28]}>
        <boxGeometry args={[0.015, 0.95, 0.03]} />
        <meshStandardMaterial color="#8b5cf6" roughness={0.4} />
      </mesh>

      {/* CONTROL PANEL (Angled shelf) */}
      <group position={[0, 0.95, 0.22]} rotation={[0.25, 0, 0]}>
        {/* Panel surface */}
        <mesh castShadow receiveShadow>
          <boxGeometry args={[0.66, 0.04, 0.32]} />
          <meshStandardMaterial color="#1b1828" roughness={0.5} metalness={0.4} />
        </mesh>

        {/* Joystick Base & Shaft */}
        <mesh position={[-0.14, 0.04, 0]}>
          <cylinderGeometry args={[0.02, 0.02, 0.015, 16]} />
          <meshStandardMaterial color="#111116" roughness={0.4} />
        </mesh>
        <mesh position={[-0.14, 0.09, 0]}>
          <cylinderGeometry args={[0.006, 0.006, 0.08, 12]} />
          <meshStandardMaterial color="#e2e8f0" metalness={0.9} roughness={0.1} />
        </mesh>
        {/* Joystick Red Ball Top */}
        <mesh position={[-0.14, 0.14, 0]}>
          <sphereGeometry args={[0.025, 16, 16]} />
          <meshStandardMaterial color="#ef4444" roughness={0.2} />
        </mesh>

        {/* Action Buttons (Purple, Yellow, Blue) */}
        {[
          { x: 0.08, z: 0.02, c: '#7c3aed' },
          { x: 0.14, z: -0.02, c: '#fbbf24' },
          { x: 0.20, z: 0.02, c: '#3b82f6' },
        ].map((btn, i) => (
          <mesh key={i} position={[btn.x, 0.03, btn.z]}>
            <cylinderGeometry args={[0.018, 0.018, 0.018, 16]} />
            <meshStandardMaterial color={btn.c} roughness={0.3} />
          </mesh>
        ))}
      </group>

      {/* CRT SCREEN HOUSING (Recessed & Angled backwards) */}
      <group position={[0, 1.28, 0.08]} rotation={[-0.3, 0, 0]}>
        {/* Bezel */}
        <mesh castShadow receiveShadow>
          <boxGeometry args={[0.58, 0.48, 0.04]} />
          <meshStandardMaterial color="#0c0a12" roughness={0.8} />
        </mesh>

        {/* Screen Display Face */}
        {screenTexRef.current && (
          <mesh position={[0, 0, 0.022]}>
            <planeGeometry args={[0.48, 0.4]} />
            <meshBasicMaterial map={screenTexRef.current} />
          </mesh>
        )}
      </group>

      {/* MARQUEE SIGNBOARD (Top glowing sign) */}
      <group position={[0, 1.68, 0.14]} rotation={[0.1, 0, 0]}>
        {/* Marquee box */}
        <mesh castShadow>
          <boxGeometry args={[0.66, 0.18, 0.16]} />
          <meshStandardMaterial color="#12101b" roughness={0.6} />
        </mesh>
        {/* Illuminated Marquee face */}
        <mesh position={[0, 0, 0.082]}>
          <planeGeometry args={[0.62, 0.14]} />
          <meshBasicMaterial color="#8b5cf6" />
        </mesh>
      </group>

      {/* Screen & Marquee glow light */}
      <pointLight
        position={[0, 1.4, 0.4]}
        color="#8b5cf6"
        intensity={isHovered ? 1.6 : 0.9}
        distance={2.0}
      />
    </group>
  )
}
