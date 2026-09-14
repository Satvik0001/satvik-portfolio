import React from 'react'

export default function Headphones() {
  return (
    <group position={[-0.75, 0.905, -0.15]} rotation={[0, 0.3, 0]}>
      {/* Aluminum Stand Base */}
      <mesh position={[0, 0.01, 0]} castShadow>
        <cylinderGeometry args={[0.06, 0.065, 0.015, 20]} />
        <meshStandardMaterial color="#1a1a24" roughness={0.3} metalness={0.8} />
      </mesh>
      {/* Stand Stem */}
      <mesh position={[0, 0.14, 0]} castShadow>
        <cylinderGeometry args={[0.008, 0.008, 0.26, 16]} />
        <meshStandardMaterial color="#2a2838" roughness={0.3} metalness={0.8} />
      </mesh>
      {/* Stand Curved Cradle */}
      <mesh position={[0, 0.27, 0]} rotation={[0, 0, Math.PI / 2]}>
        <torusGeometry args={[0.035, 0.006, 8, 16, Math.PI]} />
        <meshStandardMaterial color="#1f1d2b" roughness={0.4} metalness={0.7} />
      </mesh>

      {/* HEADPHONES */}
      {/* Headband arch */}
      <mesh position={[0, 0.25, 0]}>
        <torusGeometry args={[0.07, 0.008, 12, 24, Math.PI]} rotation={[0, 0, 0]} />
        <meshStandardMaterial color="#12101a" roughness={0.6} />
      </mesh>

      {/* Left Ear Cup */}
      <group position={[-0.07, 0.17, 0]}>
        <mesh castShadow>
          <cylinderGeometry args={[0.035, 0.035, 0.03, 20]} rotation={[0, 0, Math.PI / 2]} />
          <meshStandardMaterial color="#181424" roughness={0.5} metalness={0.4} />
        </mesh>
        {/* Purple accent ring */}
        <mesh position={[0.012, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
          <ringGeometry args={[0.024, 0.03, 20]} />
          <meshBasicMaterial color="#7c3aed" />
        </mesh>
      </group>

      {/* Right Ear Cup */}
      <group position={[0.07, 0.17, 0]}>
        <mesh castShadow>
          <cylinderGeometry args={[0.035, 0.035, 0.03, 20]} rotation={[0, 0, Math.PI / 2]} />
          <meshStandardMaterial color="#181424" roughness={0.5} metalness={0.4} />
        </mesh>
        {/* Purple accent ring */}
        <mesh position={[-0.012, 0, 0]} rotation={[0, -Math.PI / 2, 0]}>
          <ringGeometry args={[0.024, 0.03, 20]} />
          <meshBasicMaterial color="#7c3aed" />
        </mesh>
      </group>
    </group>
  )
}
