import React, { useRef, useEffect } from 'react'
import * as THREE from 'three'
import {
  createUnityCanvas,
  animateUnityCanvas
} from './ScreenContent/UnityScreen'
import {
  createGameplayCanvas,
  animateGameplayCanvas
} from './ScreenContent/GameplayScreen'
import {
  createVSCodeCanvas,
  animateVSCodeCanvas
} from './ScreenContent/VSCodeScreen'

export default function Monitors() {
  const unityTexRef = useRef(null)
  const gameplayTexRef = useRef(null)
  const vscodeTexRef = useRef(null)

  useEffect(() => {
    // 1. Left Vertical: Unity Editor (Static High-Res, drawn once)
    const unityCanvas = createUnityCanvas(384, 672)
    const unityTex = new THREE.CanvasTexture(unityCanvas)
    unityTex.colorSpace = THREE.SRGBColorSpace
    unityTex.generateMipmaps = false
    unityTex.minFilter = THREE.LinearFilter
    unityTexRef.current = unityTex
    const cancelUnity = animateUnityCanvas(unityCanvas)

    // 2. Center Horizontal: Gameplay (512x288, lightweight animated)
    const gameCanvas = createGameplayCanvas(512, 288)
    const gameTex = new THREE.CanvasTexture(gameCanvas)
    gameTex.colorSpace = THREE.SRGBColorSpace
    gameTex.generateMipmaps = false
    gameTex.minFilter = THREE.LinearFilter
    gameplayTexRef.current = gameTex
    const cancelGame = animateGameplayCanvas(gameCanvas)

    // 3. Right Vertical: VS Code (Static High-Res, drawn once)
    const vsCanvas = createVSCodeCanvas(384, 672)
    const vsTex = new THREE.CanvasTexture(vsCanvas)
    vsTex.colorSpace = THREE.SRGBColorSpace
    vsTex.generateMipmaps = false
    vsTex.minFilter = THREE.LinearFilter
    vscodeTexRef.current = vsTex
    const cancelVS = animateVSCodeCanvas(vsCanvas)

    // Only update center gameplay monitor at an optimal 20 FPS (every 50ms)
    // to save massive GPU texture bandwidth and eliminate main thread lag!
    const interval = setInterval(() => {
      if (gameplayTexRef.current) {
        gameplayTexRef.current.needsUpdate = true
      }
    }, 50)

    // Initial render for side static monitors
    unityTex.needsUpdate = true
    vsTex.needsUpdate = true

    return () => {
      clearInterval(interval)
      cancelUnity?.()
      cancelGame?.()
      cancelVS?.()
      unityTex.dispose()
      gameTex.dispose()
      vsTex.dispose()
    }
  }, [])

  return (
    <group position={[0, 0.9, -0.2]}>
      {/* Central mount base */}
      <mesh position={[0, 0.02, -0.15]}>
        <cylinderGeometry args={[0.08, 0.1, 0.04, 16]} />
        <meshStandardMaterial color="#1a1a24" roughness={0.4} metalness={0.8} />
      </mesh>
      {/* Central pole */}
      <mesh position={[0, 0.35, -0.15]}>
        <cylinderGeometry args={[0.022, 0.022, 0.7, 12]} />
        <meshStandardMaterial color="#22222e" roughness={0.3} metalness={0.85} />
      </mesh>
      {/* Crossbar horizontal arm */}
      <mesh position={[0, 0.45, -0.15]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.018, 0.018, 1.6, 12]} />
        <meshStandardMaterial color="#1f1f2b" roughness={0.3} metalness={0.85} />
      </mesh>

      {/* ========================================================= */}
      {/* 1. LEFT MONITOR (VERTICAL - UNITY EDITOR) */}
      {/* ========================================================= */}
      <group position={[-0.88, 0.45, 0.05]} rotation={[0, 0.35, 0]}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[0.54, 0.92, 0.03]} />
          <meshStandardMaterial color="#14141c" roughness={0.6} metalness={0.4} />
        </mesh>
        {unityTexRef.current && (
          <mesh position={[0, 0, 0.016]}>
            <planeGeometry args={[0.5, 0.88]} />
            <meshBasicMaterial map={unityTexRef.current} />
          </mesh>
        )}
      </group>

      {/* ========================================================= */}
      {/* 2. CENTER MONITOR (HORIZONTAL - GAMEPLAY MAIN) */}
      {/* ========================================================= */}
      <group position={[0, 0.46, 0]}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[1.05, 0.62, 0.03]} />
          <meshStandardMaterial color="#121218" roughness={0.6} metalness={0.4} />
        </mesh>
        {gameplayTexRef.current && (
          <mesh position={[0, 0, 0.016]}>
            <planeGeometry args={[1.0, 0.58]} />
            <meshBasicMaterial map={gameplayTexRef.current} />
          </mesh>
        )}
        {/* Dynamic gameplay monitor fill light */}
        <pointLight color="#8b5cf6" intensity={0.9} distance={1.6} position={[0, 0, 0.25]} />
      </group>

      {/* ========================================================= */}
      {/* 3. RIGHT MONITOR (VERTICAL - VS CODE C#) */}
      {/* ========================================================= */}
      <group position={[0.88, 0.45, 0.05]} rotation={[0, -0.35, 0]}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[0.54, 0.92, 0.03]} />
          <meshStandardMaterial color="#14141c" roughness={0.6} metalness={0.4} />
        </mesh>
        {vscodeTexRef.current && (
          <mesh position={[0, 0, 0.016]}>
            <planeGeometry args={[0.5, 0.88]} />
            <meshBasicMaterial map={vscodeTexRef.current} />
          </mesh>
        )}
      </group>
    </group>
  )
}
