import React, { useRef } from 'react'
import { useFrame } from '@react-three/fiber'

export default function Plant() {
  const leavesGroupRef = useRef(null)

  // Very subtle breathing/swaying leaf animation
  useFrame(({ clock }) => {
    if (leavesGroupRef.current) {
      const t = clock.getElapsedTime()
      leavesGroupRef.current.rotation.y = Math.sin(t * 0.8) * 0.04
      leavesGroupRef.current.rotation.z = Math.cos(t * 0.6) * 0.02
    }
  })

  return (
    <group position={[-0.95, 0.905, 0.25]}>
      {/* Matte Ceramic Pot */}
      <mesh position={[0, 0.06, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.075, 0.055, 0.12, 20]} />
        <meshStandardMaterial color="#1a1824" roughness={0.8} />
      </mesh>
      {/* Decorative Gold/Copper Band on Pot */}
      <mesh position={[0, 0.08, 0]}>
        <torusGeometry args={[0.073, 0.003, 8, 24]} rotation={[Math.PI / 2, 0, 0]} />
        <meshStandardMaterial color="#c084fc" metalness={0.7} roughness={0.3} />
      </mesh>
      {/* Soil */}
      <mesh position={[0, 0.115, 0]}>
        <cylinderGeometry args={[0.07, 0.07, 0.01, 16]} />
        <meshStandardMaterial color="#1f1814" roughness={0.95} />
      </mesh>

      {/* Foliage / Leaves */}
      <group ref={leavesGroupRef} position={[0, 0.12, 0]}>
        {/* Leaf 1 */}
        <mesh position={[0.03, 0.06, 0.02]} rotation={[0.4, 0.5, -0.3]} castShadow>
          <coneGeometry args={[0.035, 0.14, 5]} />
          <meshStandardMaterial color="#2d6a4f" roughness={0.6} />
        </mesh>
        {/* Leaf 2 */}
        <mesh position={[-0.04, 0.07, -0.02]} rotation={[-0.3, -0.6, 0.4]} castShadow>
          <coneGeometry args={[0.038, 0.16, 5]} />
          <meshStandardMaterial color="#40916c" roughness={0.6} />
        </mesh>
        {/* Leaf 3 */}
        <mesh position={[0.01, 0.09, -0.04]} rotation={[-0.5, 0.2, -0.2]} castShadow>
          <coneGeometry args={[0.03, 0.15, 5]} />
          <meshStandardMaterial color="#52b788" roughness={0.6} />
        </mesh>
        {/* Leaf 4 */}
        <mesh position={[-0.02, 0.08, 0.04]} rotation={[0.5, -0.4, 0.2]} castShadow>
          <coneGeometry args={[0.032, 0.13, 5]} />
          <meshStandardMaterial color="#2d6a4f" roughness={0.6} />
        </mesh>
        {/* Center Top Sprout */}
        <mesh position={[0, 0.11, 0]} rotation={[0.1, 0, 0]} castShadow>
          <coneGeometry args={[0.025, 0.15, 5]} />
          <meshStandardMaterial color="#74c69d" roughness={0.5} />
        </mesh>
      </group>
    </group>
  )
}
