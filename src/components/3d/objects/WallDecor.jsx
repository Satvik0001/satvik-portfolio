import React from 'react'

export default function WallDecor() {
  return (
    <group position={[-1.2, 2.1, -1.18]}>
      {/* Black Frame */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[0.95, 1.25, 0.03]} />
        <meshStandardMaterial color="#0e0c14" roughness={0.4} metalness={0.7} />
      </mesh>

      {/* Poster Canvas / Blueprint Artwork */}
      <mesh position={[0, 0, 0.017]}>
        <planeGeometry args={[0.88, 1.18]} />
        <meshStandardMaterial color="#161324" roughness={0.8} />
      </mesh>

      {/* Geometric Game Wireframe Pattern (Mesh) */}
      <mesh position={[0, 0.1, 0.02]}>
        <icosahedronGeometry args={[0.26, 1]} />
        <meshBasicMaterial color="#8b5cf6" wireframe />
      </mesh>

      {/* Modern typography decorative blocks */}
      <mesh position={[0, -0.32, 0.02]}>
        <planeGeometry args={[0.5, 0.02]} />
        <meshBasicMaterial color="#c4b5fd" />
      </mesh>
      <mesh position={[0, -0.38, 0.02]}>
        <planeGeometry args={[0.32, 0.015]} />
        <meshBasicMaterial color="#7c3aed" />
      </mesh>
    </group>
  )
}
