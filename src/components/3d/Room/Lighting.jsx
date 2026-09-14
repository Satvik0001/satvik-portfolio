import React from 'react'

export default function Lighting() {
  return (
    <>
      {/* Neutral Ambient Light (brightens up all objects, walls, and floor naturally) */}
      <ambientLight color="#f3e8ff" intensity={1.2} />

      {/* Theme-defining soft purple ambient wash */}
      <ambientLight color="#7c3aed" intensity={0.5} />

      {/* Warm Main Key Light (overhead-front for clear visibility and soft cast shadows) */}
      <directionalLight
        position={[2.5, 4.8, 3.2]}
        intensity={2.0}
        color="#fffaf0"
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-near={0.5}
        shadow-camera-far={10}
        shadow-camera-left={-3.2}
        shadow-camera-right={3.2}
        shadow-camera-top={3.2}
        shadow-camera-bottom={-3.2}
        shadow-bias={-0.0002}
      />

      {/* Secondary Fill Light from the left (balances shadows across bookshelves and chair) */}
      <directionalLight
        position={[-3.5, 3.0, 2.5]}
        intensity={1.1}
        color="#c4b5fd"
      />

      {/* Central Warm Ceiling Downlight */}
      <pointLight
        position={[0, 3.1, 0.4]}
        color="#fff5eb"
        intensity={2.2}
        distance={6.0}
      />

      {/* Warm desk lamp glow illuminating keyboard, desk mat, and monitors */}
      <pointLight
        position={[0, 1.9, 0.2]}
        color="#fef3c7"
        intensity={1.2}
        distance={2.8}
      />

      {/* Purple LED strip backlight behind desk */}
      <pointLight
        position={[0, 1.1, -0.6]}
        color="#a78bfa"
        intensity={1.2}
        distance={2.5}
      />

      {/* Floor soft ambient fill (subtle cool slate-blue, non-glaring) */}
      <pointLight
        position={[0, 0.4, 0.8]}
        color="#94a3b8"
        intensity={0.12}
        distance={2.0}
      />
    </>
  )
}
