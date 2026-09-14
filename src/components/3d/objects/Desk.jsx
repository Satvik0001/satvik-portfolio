import React from 'react'

export default function Desk() {
  return (
    <group position={[0, 0, 0]}>
      {/* Desktop tabletop (matte dark carbon/wood finish) */}
      <mesh position={[0, 0.88, 0]} castShadow receiveShadow>
        <boxGeometry args={[2.4, 0.05, 1.1]} />
        <meshStandardMaterial
          color="#16131c"
          roughness={0.7}
          metalness={0.15}
        />
      </mesh>

      {/* Desk edge accent trim (matte subtle purple line) */}
      <mesh position={[0, 0.88, 0.551]}>
        <boxGeometry args={[2.4, 0.015, 0.005]} />
        <meshStandardMaterial
          color="#7c3aed"
          roughness={0.3}
          metalness={0.4}
        />
      </mesh>

      {/* Large Extended Desk Mat (Matte Charcoal with purple stitched border) */}
      <mesh position={[0, 0.906, 0.1]} receiveShadow>
        <boxGeometry args={[1.5, 0.004, 0.6]} />
        <meshStandardMaterial
          color="#0c0a12"
          roughness={0.9}
          metalness={0.05}
        />
      </mesh>
      {/* Desk Mat Edge Stitches */}
      <mesh position={[0, 0.908, 0.1]}>
        <boxGeometry args={[1.505, 0.002, 0.605]} />
        <meshStandardMaterial
          color="#5b21b6"
          roughness={0.5}
        />
      </mesh>

      {/* Steel frame legs (modern T-legs or motorized standing desk frame) */}
      {/* Left leg column */}
      <mesh position={[-1.0, 0.44, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.08, 0.85, 0.08]} />
        <meshStandardMaterial color="#1a1a24" roughness={0.5} metalness={0.8} />
      </mesh>
      {/* Left foot */}
      <mesh position={[-1.0, 0.02, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.1, 0.04, 0.9]} />
        <meshStandardMaterial color="#14141d" roughness={0.4} metalness={0.85} />
      </mesh>

      {/* Right leg column */}
      <mesh position={[1.0, 0.44, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.08, 0.85, 0.08]} />
        <meshStandardMaterial color="#1a1a24" roughness={0.5} metalness={0.8} />
      </mesh>
      {/* Right foot */}
      <mesh position={[1.0, 0.02, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.1, 0.04, 0.9]} />
        <meshStandardMaterial color="#14141d" roughness={0.4} metalness={0.85} />
      </mesh>

      {/* Support crossbar underneath */}
      <mesh position={[0, 0.78, -0.2]}>
        <boxGeometry args={[2.0, 0.04, 0.06]} />
        <meshStandardMaterial color="#1a1a24" roughness={0.5} metalness={0.8} />
      </mesh>

      {/* Cable tray under the desk */}
      <mesh position={[0, 0.72, -0.3]}>
        <boxGeometry args={[1.2, 0.08, 0.16]} />
        <meshStandardMaterial color="#111019" roughness={0.7} />
      </mesh>

      {/* Ambient LED strip along back of desk */}
      <mesh position={[0, 0.86, -0.54]}>
        <boxGeometry args={[2.3, 0.015, 0.01]} />
        <meshBasicMaterial color="#8b5cf6" />
      </mesh>
      <pointLight
        position={[0, 0.9, -0.6]}
        color="#7c3aed"
        intensity={0.8}
        distance={2.0}
      />
    </group>
  )
}
