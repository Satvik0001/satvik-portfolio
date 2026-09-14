import React from 'react'

export default function CityWindow() {
  return (
    <group position={[2.78, 1.85, -0.4]} rotation={[0, -Math.PI / 2, 0]}>
      {/* Matte black modern window frame */}
      <mesh position={[0, 0, 0]} castShadow>
        <boxGeometry args={[1.6, 2.2, 0.08]} />
        <meshStandardMaterial color="#14111d" roughness={0.5} metalness={0.8} />
      </mesh>

      {/* Frame inner mullions / crossbars */}
      <mesh position={[0, 0, 0.02]}>
        <boxGeometry args={[1.52, 0.04, 0.05]} />
        <meshStandardMaterial color="#14111d" roughness={0.4} metalness={0.8} />
      </mesh>
      <mesh position={[0, 0, 0.02]}>
        <boxGeometry args={[0.04, 2.12, 0.05]} />
        <meshStandardMaterial color="#14111d" roughness={0.4} metalness={0.8} />
      </mesh>

      {/* Sky backdrop plane with deep purple night horizon */}
      <mesh position={[0, 0, -0.06]}>
        <planeGeometry args={[1.5, 2.1]} />
        <meshBasicMaterial color="#0c071e" />
      </mesh>

      {/* Distant Cyberpunk City Skyline Silhouettes */}
      {/* Tall central tower */}
      <mesh position={[0, -0.3, -0.05]}>
        <planeGeometry args={[0.22, 1.3]} />
        <meshBasicMaterial color="#190e38" />
      </mesh>
      {/* Antenna spire on top */}
      <mesh position={[0, 0.42, -0.049]}>
        <planeGeometry args={[0.012, 0.25]} />
        <meshBasicMaterial color="#a855f7" />
      </mesh>

      {/* Skyscraper 2 (Left) */}
      <mesh position={[-0.35, -0.4, -0.05]}>
        <planeGeometry args={[0.28, 1.1]} />
        <meshBasicMaterial color="#140b30" />
      </mesh>
      {/* Skyscraper 3 (Right) */}
      <mesh position={[0.4, -0.45, -0.05]}>
        <planeGeometry args={[0.34, 1.0]} />
        <meshBasicMaterial color="#160c34" />
      </mesh>

      {/* Tiny glowing window grid on skyscrapers */}
      {[-0.06, 0, 0.06].map((wx, i) =>
        [-0.1, 0.05, 0.2].map((wy, j) => (
          <mesh key={`${i}-${j}`} position={[wx, wy, -0.048]}>
            <planeGeometry args={[0.018, 0.025]} />
            <meshBasicMaterial color={i % 2 === 0 ? '#38bdf8' : '#e879f9'} />
          </mesh>
        ))
      )}

      {/* Glowing Full Moon / Cyberpunk Horizon Orb */}
      <mesh position={[0.38, 0.62, -0.052]}>
        <circleGeometry args={[0.11, 24]} />
        <meshBasicMaterial color="#f5d0fe" />
      </mesh>

      {/* Window Ambient City Glow into the room */}
      <pointLight
        position={[0, 0.2, 0.4]}
        color="#818cf8"
        intensity={1.2}
        distance={2.8}
      />
    </group>
  )
}
