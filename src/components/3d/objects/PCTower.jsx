import React, { useRef } from 'react'
import { useFrame } from '@react-three/fiber'

export default function PCTower() {
  const fanRef = useRef(null)

  useFrame((_, delta) => {
    if (fanRef.current) {
      fanRef.current.rotation.z += delta * 6
    }
  })

  return (
    // Positioned safely to the right of the desk (Desk right leg is at x=1.0)
    // Placed at x=1.35 with 0.35m clearance — completely free of any collision!
    <group position={[1.35, 0.26, 0.08]} rotation={[0, -0.12, 0]}>
      {/* PC Stand floor plate */}
      <mesh position={[0, -0.245, 0]} receiveShadow>
        <boxGeometry args={[0.26, 0.015, 0.52]} />
        <meshStandardMaterial color="#1e1e2c" roughness={0.7} metalness={0.8} />
      </mesh>

      {/* PC Case Chassis (Matte dark steel) */}
      <mesh position={[0, 0, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.24, 0.48, 0.48]} />
        <meshStandardMaterial color="#13141f" roughness={0.5} metalness={0.7} />
      </mesh>

      {/* Front mesh intake panel */}
      <mesh position={[0, 0, 0.241]}>
        <boxGeometry args={[0.22, 0.46, 0.005]} />
        <meshStandardMaterial color="#1c1d2e" roughness={0.8} metalness={0.4} />
      </mesh>

      {/* Front vertical LED line — Cyber Cyan accent to contrast purple */}
      <mesh position={[0, 0, 0.244]}>
        <boxGeometry args={[0.006, 0.38, 0.002]} />
        <meshBasicMaterial color="#38bdf8" />
      </mesh>

      {/* Side Tempered Glass Panel */}
      <mesh position={[-0.121, 0, 0]}>
        <boxGeometry args={[0.003, 0.44, 0.44]} />
        <meshPhysicalMaterial
          color="#0f172a"
          roughness={0.1}
          metalness={0.1}
          transparent
          opacity={0.5}
          transmission={0.4}
        />
      </mesh>

      {/* Internal: Motherboard & GPU block */}
      <mesh position={[0.04, -0.04, 0]}>
        <boxGeometry args={[0.08, 0.08, 0.24]} />
        <meshStandardMaterial color="#1e2238" metalness={0.8} roughness={0.3} />
      </mesh>
      {/* GPU RGB Accent line — Cool Cyan / Violet contrast */}
      <mesh position={[-0.005, -0.04, 0]}>
        <boxGeometry args={[0.002, 0.012, 0.22]} />
        <meshBasicMaterial color="#06b6d4" />
      </mesh>

      {/* Internal: CPU AIO Cooler RGB ring — Electric Violet */}
      <mesh position={[0.04, 0.08, 0]} rotation={[0, Math.PI / 2, 0]}>
        <torusGeometry args={[0.035, 0.006, 8, 24]} />
        <meshBasicMaterial color="#8b5cf6" />
      </mesh>

      {/* Internal: Spinning Rear Exhaust Fan — Soft Amber/Gold lighting */}
      <group ref={fanRef} position={[0.02, 0.12, -0.2]}>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.04, 0.04, 0.005, 12]} />
          <meshBasicMaterial color="#f59e0b" wireframe />
        </mesh>
      </group>

      {/* Internal PC Ambient Light with cyan/purple blend */}
      <pointLight position={[0, 0.05, 0]} color="#38bdf8" intensity={0.6} distance={0.7} />
      <pointLight position={[0, -0.05, 0]} color="#8b5cf6" intensity={0.6} distance={0.7} />
    </group>
  )
}
