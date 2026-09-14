import React, { useRef, useState, useEffect, useCallback } from 'react'
import { useFrame } from '@react-three/fiber'
import useStore from '@stores/useStore'
import { useAudio } from '@hooks/useAudio'

export default function GamingChair() {
  const chairGroupRef = useRef(null)
  const swivelRef = useRef(null)
  const [isHovered, setIsHovered] = useState(false)

  // Drag & spin physics refs
  const isDraggingRef = useRef(false)
  const dragDistanceRef = useRef(0)
  const previousPointerX = useRef(0)
  const pointerVelocity = useRef(0)
  const spinVelocity = useRef(0)
  const currentAngle = useRef(0)

  const { setHoveredObject, setChairRotating } = useStore()
  const { playHover, playInteract } = useAudio()

  // Frame physics loop: buttery smooth free-spinning inertia
  useFrame((_, delta) => {
    if (!swivelRef.current) return

    // Limit delta to prevent wild physics jumps if tab was blurred
    const dt = Math.min(delta, 0.05)

    if (isDraggingRef.current) {
      // While dragging, apply pointer velocity directly to spin velocity with smoothing
      spinVelocity.current += (pointerVelocity.current - spinVelocity.current) * Math.min(1, 20 * dt)
      pointerVelocity.current *= Math.pow(0.7, dt * 60)
    } else {
      // While coasting, use gentle, natural bearing friction (high glide factor)
      spinVelocity.current *= Math.pow(0.965, dt * 60)
      if (Math.abs(spinVelocity.current) < 0.0002) {
        spinVelocity.current = 0
      }
    }

    // Apply rotation
    currentAngle.current += spinVelocity.current
    swivelRef.current.rotation.y = currentAngle.current
  })

  // Pointer down: initiate drag
  const onPointerDown = useCallback((e) => {
    e.stopPropagation()
    isDraggingRef.current = true
    dragDistanceRef.current = 0
    setChairRotating(true)
    previousPointerX.current = e.clientX
    pointerVelocity.current = 0
  }, [setChairRotating])

  // Window pointer move: fluid tracking across whole screen
  useEffect(() => {
    const handleWindowPointerMove = (e) => {
      if (!isDraggingRef.current) return
      const deltaX = e.clientX - previousPointerX.current
      previousPointerX.current = e.clientX
      dragDistanceRef.current += Math.abs(deltaX)

      // Direct, responsive angular velocity (feels natural & agile, not rigid)
      const angularStep = deltaX * 0.012
      pointerVelocity.current = angularStep
      currentAngle.current += angularStep
    }

    const handleWindowPointerUp = () => {
      if (isDraggingRef.current) {
        isDraggingRef.current = false
        setChairRotating(false)
      }
    }

    window.addEventListener('pointermove', handleWindowPointerMove)
    window.addEventListener('pointerup', handleWindowPointerUp)
    return () => {
      window.removeEventListener('pointermove', handleWindowPointerMove)
      window.removeEventListener('pointerup', handleWindowPointerUp)
    }
  }, [setChairRotating])

  // Click handler: if user tapped/clicked without dragging, give it a fun spin!
  const handleClick = (e) => {
    e.stopPropagation()
    if (dragDistanceRef.current < 6) {
      playInteract()
      // Give the chair a smooth satisfying spin boost
      spinVelocity.current = spinVelocity.current >= 0 ? 0.14 : -0.14
    }
  }

  return (
    <group
      ref={chairGroupRef}
      position={[0, 0, 0.9]}
      onClick={handleClick}
      onPointerOver={(e) => {
        e.stopPropagation()
        setIsHovered(true)
        setHoveredObject('GAMING CHAIR — Click to spin or Drag to rotate')
        playHover()
      }}
      onPointerOut={() => {
        setIsHovered(false)
        setHoveredObject(null)
      }}
      onPointerDown={onPointerDown}
    >
      {/* 5-STAR WHEEL BASE (Static on floor) */}
      <group position={[0, 0, 0]}>
        {/* Central hydraulic base cylinder */}
        <mesh position={[0, 0.12, 0]} castShadow>
          <cylinderGeometry args={[0.045, 0.05, 0.15, 16]} />
          <meshStandardMaterial color="#1a1a24" roughness={0.4} metalness={0.8} />
        </mesh>

        {/* 5 base spokes with caster wheels */}
        {[0, 1, 2, 3, 4].map((i) => {
          const angle = (i * Math.PI * 2) / 5
          return (
            <group key={i} rotation={[0, angle, 0]}>
              <mesh position={[0.16, 0.06, 0]} rotation={[0, 0, -0.1]} castShadow>
                <boxGeometry args={[0.32, 0.025, 0.04]} />
                <meshStandardMaterial
                  color={isHovered ? '#2d1e48' : '#14141c'}
                  roughness={0.4}
                  metalness={0.7}
                />
              </mesh>
              <mesh position={[0.32, 0.03, 0]} castShadow>
                <sphereGeometry args={[0.03, 12, 12]} />
                <meshStandardMaterial color="#0b0b10" roughness={0.7} />
              </mesh>
            </group>
          )
        })}

        {/* Hydraulic Piston Shaft */}
        <mesh position={[0, 0.26, 0]} castShadow>
          <cylinderGeometry args={[0.025, 0.025, 0.2, 16]} />
          <meshStandardMaterial color="#505068" roughness={0.2} metalness={0.95} />
        </mesh>
      </group>

      {/* SWIVELING SEAT & UPPER BODY (Rotates fluidly around Y-axis) */}
      <group ref={swivelRef} position={[0, 0.35, 0]}>
        {/* Tilt mechanism plate */}
        <mesh position={[0, 0.04, 0]} castShadow>
          <boxGeometry args={[0.22, 0.05, 0.25]} />
          <meshStandardMaterial color="#111116" roughness={0.6} metalness={0.7} />
        </mesh>

        {/* Ergonomic Seat Cushion */}
        <mesh position={[0, 0.12, 0.02]} castShadow receiveShadow>
          <boxGeometry args={[0.54, 0.1, 0.54]} />
          <meshStandardMaterial
            color={isHovered ? '#251e3c' : '#1a1728'}
            roughness={0.65}
            metalness={0.1}
          />
        </mesh>
        {/* Seat side racing bolsters */}
        <mesh position={[-0.26, 0.16, 0.02]} rotation={[0, 0, 0.25]} castShadow>
          <boxGeometry args={[0.08, 0.12, 0.52]} />
          <meshStandardMaterial
            color={isHovered ? '#7c3aed' : '#5b21b6'}
            roughness={0.6}
          />
        </mesh>
        <mesh position={[0.26, 0.16, 0.02]} rotation={[0, 0, -0.25]} castShadow>
          <boxGeometry args={[0.08, 0.12, 0.52]} />
          <meshStandardMaterial
            color={isHovered ? '#7c3aed' : '#5b21b6'}
            roughness={0.6}
          />
        </mesh>

        {/* Backrest Structure */}
        <group position={[0, 0.58, -0.22]} rotation={[-0.12, 0, 0]}>
          <mesh castShadow receiveShadow>
            <boxGeometry args={[0.48, 0.82, 0.08]} />
            <meshStandardMaterial
              color={isHovered ? '#2a2245' : '#1d1930'}
              roughness={0.65}
              metalness={0.1}
            />
          </mesh>

          {/* Purple racing stripe */}
          <mesh position={[0, 0, 0.043]}>
            <boxGeometry args={[0.1, 0.78, 0.005]} />
            <meshStandardMaterial color="#8b5cf6" roughness={0.4} metalness={0.3} />
          </mesh>

          {/* Lumbar support pillow */}
          <mesh position={[0, -0.22, 0.06]} castShadow>
            <cylinderGeometry args={[0.045, 0.045, 0.36, 16]} />
            <meshStandardMaterial color="#6d28d9" roughness={0.7} />
          </mesh>

          {/* Headrest Pillow */}
          <mesh position={[0, 0.32, 0.06]} castShadow>
            <boxGeometry args={[0.26, 0.14, 0.06]} />
            <meshStandardMaterial color="#7c3aed" roughness={0.7} />
          </mesh>

          {/* Embroidered Logo on Headrest */}
          <mesh position={[0, 0.32, 0.093]}>
            <circleGeometry args={[0.024, 16]} />
            <meshBasicMaterial color="#c084fc" />
          </mesh>
        </group>

        {/* 4D Adjustable Armrests */}
        <group position={[-0.32, 0.18, 0.02]}>
          <mesh castShadow>
            <boxGeometry args={[0.04, 0.22, 0.04]} />
            <meshStandardMaterial color="#1a1a24" roughness={0.4} metalness={0.8} />
          </mesh>
          <mesh position={[0, 0.12, -0.02]} castShadow>
            <boxGeometry args={[0.09, 0.035, 0.24]} />
            <meshStandardMaterial color="#111116" roughness={0.8} />
          </mesh>
        </group>

        <group position={[0.32, 0.18, 0.02]}>
          <mesh castShadow>
            <boxGeometry args={[0.04, 0.22, 0.04]} />
            <meshStandardMaterial color="#1a1a24" roughness={0.4} metalness={0.8} />
          </mesh>
          <mesh position={[0, 0.12, -0.02]} castShadow>
            <boxGeometry args={[0.09, 0.035, 0.24]} />
            <meshStandardMaterial color="#111116" roughness={0.8} />
          </mesh>
        </group>
      </group>
    </group>
  )
}
