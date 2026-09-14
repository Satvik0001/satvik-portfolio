import React from 'react'
import Lighting from './Lighting'
import Desk from '../objects/Desk'
import Monitors from '../objects/Monitors'
import GamingChair from '../objects/GamingChair'
import Keyboard from '../objects/Keyboard'
import Mouse from '../objects/Mouse'
import Plant from '../objects/Plant'
import PCTower from '../objects/PCTower'
import Headphones from '../objects/Headphones'
import Bookshelf from '../objects/Bookshelf'
import TrophyShelf from '../objects/TrophyShelf'
import ArcadeMachine from '../objects/ArcadeMachine'
import WallDecor from '../objects/WallDecor'
import VinylPlayer from '../objects/VinylPlayer'
import CityWindow from '../objects/CityWindow'
import NanoleafPanels from '../objects/NanoleafPanels'
import DeskAccessories from '../objects/DeskAccessories'
import Whiteboard from '../objects/Whiteboard'

export default function GamingRoom() {
  return (
    <group>
      {/* Lighting Rig */}
      <Lighting />

      {/* ========================================================= */}
      {/* ROOM ARCHITECTURE */}
      {/* ========================================================= */}

      {/* FLOOR */}
      <mesh
        position={[0, 0, 0.4]}
        rotation={[-Math.PI / 2, 0, 0]}
        receiveShadow
      >
        <planeGeometry args={[6.0, 5.0]} />
        <meshStandardMaterial
          color="#1a1730"
          roughness={0.78}
          metalness={0.05}
        />
      </mesh>

      {/* PLUSH AREA RUG UNDER DESK & CHAIR (Matte dark charcoal with non-glowing edge) */}
      <mesh
        position={[0, 0.005, 0.45]}
        rotation={[-Math.PI / 2, 0, 0]}
        receiveShadow
      >
        <planeGeometry args={[2.8, 2.2]} />
        <meshStandardMaterial
          color="#161520"
          roughness={0.98}
        />
      </mesh>
      {/* Rug Edge Trim (Subtle muted slate-indigo, no harsh glow) */}
      <mesh
        position={[0, 0.006, 0.45]}
        rotation={[-Math.PI / 2, 0, 0]}
      >
        <planeGeometry args={[2.82, 2.22]} />
        <meshStandardMaterial
          color="#2e2b40"
          roughness={0.96}
        />
      </mesh>

      {/* BACK WALL */}
      <mesh
        position={[0, 1.7, -1.2]}
        receiveShadow
      >
        <planeGeometry args={[6.0, 3.4]} />
        <meshStandardMaterial
          color="#201c36"
          roughness={0.8}
        />
      </mesh>

      {/* LEFT WALL */}
      <mesh
        position={[-2.8, 1.7, 0.4]}
        rotation={[0, Math.PI / 2, 0]}
        receiveShadow
      >
        <planeGeometry args={[5.0, 3.4]} />
        <meshStandardMaterial
          color="#1c1832"
          roughness={0.8}
        />
      </mesh>

      {/* RIGHT WALL */}
      <mesh
        position={[2.8, 1.7, 0.4]}
        rotation={[0, -Math.PI / 2, 0]}
        receiveShadow
      >
        <planeGeometry args={[5.0, 3.4]} />
        <meshStandardMaterial
          color="#1c1832"
          roughness={0.8}
        />
      </mesh>

      {/* CEILING */}
      <mesh
        position={[0, 3.4, 0.4]}
        rotation={[Math.PI / 2, 0, 0]}
      >
        <planeGeometry args={[6.0, 5.0]} />
        <meshStandardMaterial
          color="#14111f"
          roughness={0.9}
        />
      </mesh>

      {/* BASEBOARDS (Back & Sides) */}
      <mesh position={[0, 0.06, -1.185]}>
        <boxGeometry args={[6.0, 0.12, 0.02]} />
        <meshStandardMaterial color="#2a2448" roughness={0.7} />
      </mesh>
      <mesh position={[-2.785, 0.06, 0.4]} rotation={[0, Math.PI / 2, 0]}>
        <boxGeometry args={[5.0, 0.12, 0.02]} />
        <meshStandardMaterial color="#2a2448" roughness={0.7} />
      </mesh>
      <mesh position={[2.785, 0.06, 0.4]} rotation={[0, Math.PI / 2, 0]}>
        <boxGeometry args={[5.0, 0.12, 0.02]} />
        <meshStandardMaterial color="#2a2448" roughness={0.7} />
      </mesh>

      {/* ========================================================= */}
      {/* 3D OBJECTS & DETAILED ASSETS IN THE WORKSPACE */}
      {/* ========================================================= */}
      <Desk />
      <Monitors />
      <GamingChair />
      <Keyboard />
      <Mouse />
      <Plant />
      <PCTower />
      <Headphones />
      <Bookshelf />
      <TrophyShelf />
      <ArcadeMachine />
      {/* Sphere wireframe art piece — back wall left */}
      <WallDecor />
      {/* Vinyl Turntable / Spotify Jukebox — right wall, above & behind city window */}
      <VinylPlayer />

      {/* NEW IMMERSIVE ROOM FEATURES */}
      <CityWindow />
      <NanoleafPanels />
      <DeskAccessories />
      <Whiteboard />
    </group>
  )
}
